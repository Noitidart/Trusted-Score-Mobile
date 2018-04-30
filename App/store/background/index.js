// @flow

import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'

export type Shape = {
    color: 'opaque' | Color
};

const INITIAL = {
    color: 'transparent'
};
export const sagas = [];

const A = ([actionType]: string[]) => 'BACKGROUND_' + actionType; // Action type prefixer

//
const PATCH = A`PATCH`;
type PatchAction = { type: typeof PATCH, data: $Shape<Shape> };
const patch = (data: $Shape<Shape>): PatchAction => ({ type:PATCH, data });

//
type Action = PatchAction;

export default function reducer(state: Shape = INITIAL, action:Action): Shape {
    switch(action.type) {
        case PATCH: return { ...state, ...action.data };
        default: return state;
    }
}

export { patch as patchBackground }
