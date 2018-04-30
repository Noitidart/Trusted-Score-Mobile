// @flow

import { NetInfo } from 'react-native'
import { call, put, select } from 'redux-saga/effects'
import qs from 'qs'
import { get } from 'lodash'

import { waitIfOfflinish, waitIfServerDown, getHost } from './utils'
import { setTestingReallyOffline, OFFLINE_TEST_SERVER, setWasNotReallyOfflineSoServerWasDown, setWasReallyOffline } from './'
// import { sessionExpired } from './session'
// import { waitIfExpired } from '../auth/utils'

import type { Host } from './'

// shouldThrow - is to throw instead of hang
type FetchIn = {
    isBodyForm?: boolean,
    // isBodyFormData?: boolean // not yet supported
    queryString?: {},
    shouldThrowOffline?: boolean,
    shouldThrowExpired?: boolean, // if true, will not wait if expired
    shouldThrowDown?: boolean
    // ...FetchIn // the 2nd arg to fetch
}

type FetchOut = {
    res: Response,
    reply: {} | string,
    status: number
};

// should mutate init
const PREPROCESS_BY_HOST: { [Host]:(input: string, init: FetchIn) => void } = {}

fetchApi.DOMAIN = 'trustedscore.mlink.info/public/api';
function* fetchApi(input: string, init: FetchIn = {}): Generator<*, FetchOut, *> {

    const preprocess = PREPROCESS_BY_HOST[getHost(input)];
    if (preprocess) yield call(preprocess, input, init);

    // preprocess - prepares init for passing to fetch
    // mutates init

    // adds the default headers in but doesnt overwrite if it already has those keys
    // if init.isBodyForm is true, then (isBodyForm is different from isBodyFormData, i havent implemented this yet)
        // Content-Type set to application/x-www-form-urlencode
        // body must be an object, and it is turned in to qs.stringify
    // else
        // Content-Type is set to application/json
        // body must be object, which gets JSON.stringify'ed
    // if queryString exists in "init" then it qs.stringify's it

    // remove non-FetchInit params
    const { shouldThrowOffline, shouldThrowExpired, shouldThrowDown, isBodyForm, queryString } = init;
    delete init.isBodyForm;
    delete init.queryString;
    delete init.shouldThrowOffline;
    delete init.shouldThrowExpired;
    delete init.shouldThrowDown;

    // always accept json
    if (!init.headers) init.headers = {};

    if (!init.headers.Accept) init.headers.Accept = 'application/json';

    // set Content-Type if its not set and we have a body
    if (!init.headers['Content-Type']) {
        if (init.body) {
            init.headers['Content-Type'] = isBodyForm ? 'application/x-www-form-urlencoded' : 'application/json';
        }
    }

    // JSON.stringify or qs.stringify
    if (init.body) {
        switch(init.headers['Content-Type']) {
            case 'application/json':
                    init.body = JSON.stringify(init.body);
                break;
            case 'application/x-www-form-urlencoded':
                    init.body = qs.stringify(init.body);
                break;
            // no default
        }
    }

    // make sure method is uppercase // do i need to?
    if (init.method) init.method = init.method.toUpperCase();

    // append query string if it needs
    if (queryString) {
        // console.log('in queryString block');
        // const rawr = qs.stringify({
        //     l: 15,
        //     p: 1,
        //     q: 'sdfasdf',
        //     r: 'P,PL',
        //     s: {
        //         role: ['admin', 'contributor']
        //     },
        //     uuid: 1
        // }, { arrayFormat:'brackets' });
        // console.log('rawr asd:', rawr);
        input += '?' + qs.stringify(queryString, { arrayFormat:'brackets' }); // for trusted family
        // input += '?' + qs.stringify(queryString); // for others
    }
    // console.log('out of queryString block');

    ////// end - preprocess

    if (!input.startsWith('http')) {
        input = `https://${fetchApi.DOMAIN}/${input}`;
        init.headers.Authorization = 'Bearer ' + (yield select()).session.token;
    }

    //// end

    console.log('fetchApi, input:', input, 'init:', init);

    while (true) {
        if (!shouldThrowOffline) yield waitIfOfflinish();
        if (!shouldThrowDown) yield waitIfServerDown(input);
        // if (!shouldThrowExpired) yield waitIfExpired();

        let res;
        try {
            res = yield call(fetch, input, init);
        } catch(initialFetchEx) {
            console.log('ex in fetchApi fetch, initialFetchEx:', initialFetchEx);
            // its either offline, or server is down
            yield put(setTestingReallyOffline());
            try {
                const { type:connType } = yield call(NetInfo.getConnectionInfo);
                console.log('connType:', connType);
                if (connType === 'none') {
                    yield put(setWasReallyOffline());
                    throw new Error('OFFLINE');
                } else {
                    // conntType is unknown, wifi, or cell (all of which can be false positive for "has connectivity"), lets test it
                    yield call(fetch, OFFLINE_TEST_SERVER);
                    // if got to this line, it didnt fail so server is down
                    if (shouldThrowDown) {
                        throw new Error('DOWN');
                    } else {
                        console.log('setting server down');
                        yield put(setWasNotReallyOfflineSoServerWasDown(input));
                        continue;
                    }
                }
            } catch(isOfflineOrDownEx) {
                if (isOfflineOrDownEx.message === 'DOWN') {
                    throw isOfflineOrDownEx; // shouldThrowDown is true ORRR shouldThrowDown && shouldThrowOffline is true
                }
                // is really offline
                console.log('isOfflineOrDownEx:', isOfflineOrDownEx); // will either be 'OFFLINE' due to connType === 'none' OR "NetworkRequest failed"ish due to OFFLINE_TEST_SERVER fetch fail
                if (shouldThrowOffline) {
                    throw new Error('OFFLINE');
                } else {
                    // console.log('got error, ex:', ex);
                    // TODO: when it times out i also get same exact error. see if i can differentiate between the two. if its timeout, then i should either (1) wait server up or (2) let user know it timed out, they can try again or (3) let user know it timed out and auto try again, and if it happens again then mark server down
                    yield put(setWasReallyOffline());
                    continue;
                }
            }
        }

        // TODO: test res against array of "server down testers" for this host, if down, then `if (shouldThrowDown) ...`

        //// postprocess
        // figure out if response is json or text
        const { status, headers:{map:{'content-type':[contentType]}} } = res;

        const isJson = contentType && contentType.includes('json');
        let reply = yield call([res, res.text]);
        if (isJson) {
            try { reply = JSON.parse(reply) }
            catch (ignore) {} // this happens if contentType said json, but reply really wasnt json. this is common for 204 when contentType is json but blank string is responsed
        }

        console.log('fetchApi, status:', status, 'reply:', typeof reply === 'string' ? `"${reply}"` : reply, 'headers:', res.headers);

        // TODO: test res against array of "session expired testers" for this host
        // TODO: if expired not for tfa then try autorefresh, if no autorefresh OR on fail autorefresh, put down for requiring user login/attn

        // if (status === 401) {
        //     // if has
        //     // if on login if get reply.text.errors.code === 403 its just first failing call, should try again
        //     // else if has otp header, its tfa

        //     const isExpiredTfa = res.headers.map.hasOwnProperty('x-tp-otp') || get(reply, 'errors[0].description') === 'Invalid token'; // if false, then obviously is expired for login so isExpiredLogin // the second part, the `errors[0].descripion` happens only when submitting a bad token in submitTfaSaga (i wish it had the otp header but no TODO: maybe ask backend to do this)
        //     if (shouldThrowExpired) {
        //         throw new Error(isExpiredTfa ? 'EXPIRED_TFA' : 'EXPIRED_LOGIN');
        //     } else {
        //         yield put(sessionExpired(isExpiredTfa));
        //         continue;
        //     }
        // }

        return { res, reply, status };
    }
}

export type { FetchIn, FetchOut }
export { PREPROCESS_BY_HOST }
export default fetchApi
