// @flow

import { take, select } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist/lib/constants'
import { get } from 'lodash'

// optimistc id ends with string "opt"

// getId
// state at path of keyPath must have shape Array<{ [Id]: { id } }>
type EntrysKeyPath = string;
const LAST_ID: { [EntrysKeyPath]: Id } = {};
export function getId(keyPath: EntrysKeyPath, state?: {}, shouldBypassCache: boolean): Id {
    if (shouldBypassCache || !(keyPath in LAST_ID)) {
        const entrys = get(state, keyPath);
        const ids = Object.keys(entrys);
        LAST_ID[keyPath] = ids.length ? Math.max(...ids) : -1;
    }
    return ++LAST_ID[keyPath];
}
export function* getIdSaga(keyPath: EntrysKeyPath, shouldBypassCache: boolean): Generator<void, number, void> {
    if (shouldBypassCache || !(keyPath in LAST_ID)) {
        const state = yield select();
        const entrys = get(state, keyPath);
        const ids = Object.keys(entrys);
        LAST_ID[keyPath] = ids.length ? Math.max(...ids) : -1;
    }
    const id = ++LAST_ID[keyPath];
    return id;
}

//
export function* waitRehydrate(): Generator<any, any, any> {
    // wait for redux-persist rehydration

    let {_persist:{ rehydrated }} = yield select();

    while (!rehydrated) {
        yield take(REHYDRATE);
        ({_persist:{ rehydrated }} = yield select());
    }
}

//
export type PromiseAction = { promise:Promise<any>, resolve:any=>void }
export function withPromise<T: Action>(action: T): T {
    // adds action.promise and action.resolve to T
    action.promise = new Promise(resolve => action.resolve = resolve);
    return action;
}
