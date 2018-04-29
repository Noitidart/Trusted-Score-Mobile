// @flow

import { delay } from 'redux-saga'
import { all, takeEvery, call, put, take, race } from 'redux-saga/effects'
import { deleteUndefined } from 'cmn/src/all'
import { omit } from 'lodash'

import { delayUntil, getServerNetKeys, waitIfOfflinish, getHost, testIsOfflinish, testIsOffline, testIsTestingIfReallyOffline } from './utils'
import fetchApi from './fetchApi'

import type { FetchIn, FetchOut } from './fetchApi'
import { withPromise } from '../utils'

// staus message is string only when its respective downKey is true (i havent decided yet if it MUST have a string if is down)
export type Shape = {
    isTestingIfReallyOffline?: true,
    isOffline?: true,
    offlineStatusMessage?: NetStatusMessage
    // {domain}_isDown?: boolean,
    // {domain}_statusMessage?: NetStatusMessage
};

const INITIAL = { // startup assuming all things are up
    // isOffline: false
}

export const sagas = [];

const A = ([actionType]: string[]) => 'NET_' + actionType; // Action type prefixer

const OFFLINE_TEST_SERVER = `https:///www.duckduckgo.com/`;

const NSMS = { // NET_STATUS_MESSAGE_SPECIAL
    TESTING: 'TESTING'
}

type NetStatusMessageSpecial = $Keys<typeof NSMS>
type Host = string; // lower cased
type WillTestAt = UTC; // UTC

type NetStatusMessage = void | WillTestAt | NetStatusMessageSpecial | string; // only "void" when respective keyIsDown is true

const WAIT_DURATIONS = [5, 5, 10, 10, 15, 15, 30, 30, 60, 60, 120, 120, 300]; // seconds

//
const PATCH = A`PATCH`;
type PatchAction = {| type: typeof PATCH, data: $Shape<Shape> |}
const patch = (data: $Shape<Shape>): PatchAction => ({ type:PATCH, data });

//
// if no host provided, it cancels "offline" duration
const CANCEL_DURATION = A`CANCEL_DURATION`;
type CancelDurationAction = {| type: typeof CANCEL_DURATION, host?: Host |}
const cancelDuration = (host?: Host): CancelDurationAction => ({ type:CANCEL_DURATION, host });

//
// noop if isOffline is true
const SET_TESTING_REALLY_OFFLINE = A`SET_TESTING_REALLY_OFFLINE`;
type SetTestingReallyOfflineAction = {| type: typeof SET_TESTING_REALLY_OFFLINE |}
const setTestingReallyOffline = (): SetTestingReallyOfflineAction => ({ type:SET_TESTING_REALLY_OFFLINE });

//
const SET_WAS_REALLY_OFFLINE = A`SET_WAS_REALLY_OFFLINE`;
type SetWasReallyOfflineAction = {| type: typeof SET_WAS_REALLY_OFFLINE |}
const setWasReallyOffline = (): SetWasReallyOfflineAction => ({ type:SET_WAS_REALLY_OFFLINE });

// //
// const SET_WAS_NOT_REALLY_OFFLINE = A`SET_WAS_NOT_REALLY_OFFLINE`;
// type SetWasNotReallyOfflineAction = {| type: typeof SET_WAS_NOT_REALLY_OFFLINE |}
// const setWasNotReallyOffline = (): SetWasNotReallyOfflineAction => ({ type:SET_WAS_NOT_REALLY_OFFLINE });

const SET_WAS_NOT_REALLY_OFFLINE_SO_SERVER_WAS_DOWN = A`SET_WAS_NOT_REALLY_OFFLINE_SO_SERVER_WAS_DOWN`;
type SetWasNotReallyOfflineSoServerWasDownAction = {| type: typeof SET_WAS_NOT_REALLY_OFFLINE_SO_SERVER_WAS_DOWN, host:Host |}
const setWasNotReallyOfflineSoServerWasDown = (url: string): SetWasNotReallyOfflineSoServerWasDownAction => ({ type:SET_WAS_NOT_REALLY_OFFLINE_SO_SERVER_WAS_DOWN, host:getHost(url) });

//
const SET_ONLINE = A`SET_ONLINE`;
type SetOnlineAction = {| type: typeof SET_ONLINE |}
const setOnline = (): SetOnlineAction => ({ type:SET_ONLINE });

//
function* offlineSaga(): Generator<*, *, *> {
    while (true) {
        yield take(SET_WAS_REALLY_OFFLINE);

        let durationIx = -1;
        while (true) {
            if (durationIx < WAIT_DURATIONS.length - 1) durationIx++;
            const duration = WAIT_DURATIONS[durationIx];

            if (duration) {
                const end = duration * 1000 + Date.now();
                yield put(patch({ offlineStatusMessage:end }));
                const { cancel } = yield race({
                    countdown: delayUntil(end),
                    cancel: take(action => action.type === CANCEL_DURATION && action.host === undefined)
                });
                if (cancel) durationIx--; // repeat this duration
            }

            yield put(patch({ offlineStatusMessage:NSMS.TESTING }));


            try {
                yield all([ call(fetch, OFFLINE_TEST_SERVER), call(delay, 1000) ]);// make test last at least 1s so user sees status message that it was actually tested
                // if gets here, it didnt throw, so is back online
                yield put(setOnline());
                break;
            } catch(ignore) {
                continue;
            }
        }
    }
}
sagas.push(offlineSaga);

//
const SET_SERVER_UP = A`SET_SERVER_UP`;
type SetServerUpAction = {| type: typeof SET_SERVER_UP, host:Host |}
const setServerUp = (host: Host): SetServerUpAction => ({ type:SET_SERVER_UP, host });

// //
// const SET_SERVER_DOWN = A`SET_SERVER_DOWN`;
// type SetServerDownAction = { type: typeof SET_SERVER_DOWN, host:Host }
// const setServerDown = (url: string): SetServerDownAction => ({ type:SET_SERVER_DOWN, host:getHost(url) });

const hosts = [];
function* setServerDownWorker({ host }: SetWasNotReallyOfflineSoServerWasDownAction): Generator<*, *, *> {
    if (hosts.includes(host)) return; // already a worker is working on this host

    hosts.push(host);

    const { keyStatusMessage } = getServerNetKeys(host);

    let durationIx = -1;
    while (true) {
        if (durationIx < WAIT_DURATIONS.length - 1) durationIx++;
        const duration = WAIT_DURATIONS[durationIx];

        if (duration) {
            const end = duration * 1000 + Date.now();
            yield put(patch({ [keyStatusMessage]:end }));
            const { cancel } = yield race({
                countdown: delayUntil(end),
                cancel: take(action => action.type === CANCEL_DURATION && action.host === host)
            });
            if (cancel) durationIx--; // repeat this duration
        }


        if (yield call(testIsTestingIfReallyOffline)) {
            yield take([SET_WAS_NOT_REALLY_OFFLINE, SET_WAS_REALLY_OFFLINE]);
        }
        if (yield call(testIsOffline)) {
            yield put(patch({ [keyStatusMessage]:'WAIT_OFFLINE' })); // TODO: localize
            yield waitIfOfflinish();
            yield put(patch({ [keyStatusMessage]:undefined }));
        }

        yield put(patch({ [keyStatusMessage]:NSMS.TESTING }));
        try {
            yield all([
                call(fetchApi, `https://${host}`, { shouldThrowOffline:true, shouldThrowDown:true }), // use fetchApi because it needs to go throug the host down testers to see if its down
                call(delay, 1000) // make test last at least 1s so user sees status message that it was actually tested
            ]);
            // if gets here, it didnt throw, so server is back up
            yield put(setServerUp(host));
            break;
        } catch(ignore) {
            // OFFLINE_OR_DOWN
            continue;
        }
    }



}
function* setServerDownWatcher(): Generator<*, *, *> {
    yield takeEvery(SET_WAS_NOT_REALLY_OFFLINE_SO_SERVER_WAS_DOWN, setServerDownWorker);
}
sagas.push(setServerDownWatcher);

//
const FETCH = A`FETCH`
type FetchAction = {| type: typeof FETCH, input: string, init?: FetchIn, promise:Promise<FetchOut>, resolve:FetchOut=>void, reject:null |}
const fetchAction = (input: string, init?: FetchIn): FetchAction => withPromise({ type:FETCH, input, init, reject:null });

function* fetchWorker({ input, init, resolve }: FetchAction): Generator<*, *, *> {
    const fout = yield call(fetchApi, input, init);
    resolve(fout);
}

function* fetchWatcher(): Generator<*, *, *> {
    yield takeEvery(FETCH, fetchWorker);
}
sagas.push(fetchWatcher);

//
type Action =
  | PatchAction
  | SetOnlineAction
  | SetTestingReallyOfflineAction
  | SetWasReallyOfflineAction
//   | SetWasNotReallyOfflineAction
  | SetWasNotReallyOfflineSoServerWasDownAction
  //   | SetServerDownAction
  | SetServerUpAction;

export default function reducer(state: Shape = INITIAL, action:Action): Shape {
    switch(action.type) {
        case PATCH: return deleteUndefined({ ...state, ...action.data });
        // case SET_SERVER_DOWN: {
        //     const { keyIsDown } = getServerNetKeys(action.host);
        //     return { ...state, [keyIsDown]:true };
        // }
        case SET_ONLINE: {
            return omit(state, 'isOffline', 'offlineStatusMessage');
        }
        case SET_SERVER_UP: {
            return omit(state, Object.values(getServerNetKeys(action.host)));
        }
        case SET_TESTING_REALLY_OFFLINE: {
            return { ...state, isTestingIfReallyOffline:true };
        }
        // case SET_WAS_NOT_REALLY_OFFLINE: {
        //     return omit(state, 'isTestingIfReallyOffline');
        // }
        case SET_WAS_NOT_REALLY_OFFLINE_SO_SERVER_WAS_DOWN: {
            const { keyIsDown } = getServerNetKeys(action.host);
            const stateNext = omit(state, 'isTestingIfReallyOffline');
            stateNext[keyIsDown] = true;
            return stateNext;
        }
        case SET_WAS_REALLY_OFFLINE: {
            const stateNext = omit(state, 'isTestingIfReallyOffline');
            stateNext.isOffline = true;
            return stateNext;
        }
        default: return state;
    }
}

export type { NetStatusMessageSpecial, NetStatusMessage, Host }
export { NSMS, cancelDuration, OFFLINE_TEST_SERVER, SET_WAS_NOT_REALLY_OFFLINE_SO_SERVER_WAS_DOWN, SET_WAS_REALLY_OFFLINE, SET_ONLINE, SET_SERVER_UP, setTestingReallyOffline, setWasReallyOffline, setWasNotReallyOfflineSoServerWasDown, fetchAction }
