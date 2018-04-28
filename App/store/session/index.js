// @flow

import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'

type AccountId = number;

export type Shape = {|
    email: string,
    id: AccountId,
    apiToken?: string
|};

const INITIAL = {};
export const sagas = [];

const A = ([actionType]: string[]) => 'SESSION_' + actionType; // Action type prefixer

//
const PATCH = A`PATCH`;
type PatchAction = {| type: typeof PATCH, data: $Shape<Shape> |};
const patch = (data: $Shape<Shape>): PatchAction => ({ type:PATCH, data });


//
const LOGOUT = A`LOGOUT`;
type LogoutAction = {| type:typeof LOGOUT |}
const logout = (): LogoutAction => ({ type:LOGOUT });

//
const VERIFY = A`VERIFY`;
type VerifyAction = {| type:typeof VERIFY, promise:AuthPromise, resolve:AuthResolve |}
const verify = (): VerifyAction => promisifyAction({ type:VERIFY });

//
const REGISTER = A`REGISTER`;
type RegisterAction = {| type:typeof REGISTER, values:{| email:string, name:string, password:string, passwordConfirmation:string |}, promise:AuthPromise, resolve:AuthResolve |}
const register = (values: {| email:string, name:string, password:string, passwordConfirmation:string |}): RegisterAction => promisifyAction({ type:REGISTER, values });

//
function* authSaga(): Generator<*, *, *> {
    while (true) {
        const [login, register, verify] = yield race({
            take(LOGIN),
            take(REGISTER),
            take(VERIFY)
        });
    }
}
sagas.push(authSaga);

//
type Action = PatchAction;

export default function reducer(state: Shape = INITIAL, action:Action): Shape {
    switch(action.type) {
        case PATCH: return { state, ...state.data };
        default: return state;
    }
}

export { upAsync, up, dn }
