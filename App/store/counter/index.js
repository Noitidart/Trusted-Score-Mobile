// @flow

import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'

export type Shape = number;

const INITIAL = 10;
export const sagas = [];

const A = ([actionType]: string[]) => 'COUNTER_' + actionType; // Action type prefixer

//
const UP = A`UP`;
type UpAction = { type:typeof UP };
const up = (): UpAction => ({ type:UP });

//
const UP_ASYNC = A`UP_ASYNC`;
type UpAsyncAction = { type:typeof UP_ASYNC, times:number };
const upAsync = (times: number = 1): UpAsyncAction => ({ type:UP_ASYNC, times });

function* upAsyncWorker(action: UpAsyncAction): Generator<*, *, *> {
    for (let i=0; i<action.times; i++) {
        yield call(delay, 1000);
        yield put(up());
    }
}
function* upAsyncWatcher(): Generator<*, *, *> {
    yield takeEvery(UP_ASYNC, upAsyncWorker);
}
sagas.push(upAsyncWatcher);

//
const DN = A`DN`;
type DownAction = { type:typeof DN };
function dn(): DownAction {
    return {
        type: DN
    }
}

//
type Action =
  | UpAction
  | DownAction;

export default function reducer(state: Shape = INITIAL, action:Action): Shape {
    switch(action.type) {
        case UP: return state + 1;
        case DN: return state - 1;
        default: return state;
    }
}

export { upAsync, up, dn }
