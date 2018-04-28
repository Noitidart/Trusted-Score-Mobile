// @flow

import { delay } from 'redux-saga'
import { takeEvery, take, call, put, race } from 'redux-saga/effects'

export type Shape = {|
    status: SessionStatus
    email: string,
    id: AccountId,
    apiToken?: string
|};

const INITIAL = {};
export const sagas = [];

const A = ([actionType]: string[]) => 'SESSION_' + actionType; // Action type prefixer

type AccountId = number;
type FormResolution = void | SubmissionErrorType;
type FormResolve = FormResolution => void;
type FormPromise = Promise<FormResolution>;

const SS = {
    STARTUP: 'STARTUP', // reading redux-perist file, maybe wait for devic things?
    VERIFY: 'VERIFY', // testing if apiToken is expired
    EXPIRED: 'EXPIRED',
    OK: 'OK'
}

type SessionStatus = $Keys<typeof SS>;

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
type VerifyAction = {| type:typeof VERIFY, promise:FormPromise, resolve:FormResolve |}
const verify = (): VerifyAction => promisifyAction({ type:VERIFY });

//
type RegisterValues = {|
    email: string,
    name: string,
    password: string,
    password_confirmation: string
|}
const REGISTER = A`REGISTER`;
type RegisterAction = {| type:typeof REGISTER, values:RegisterValues, promise:FormPromise, resolve:FormResolve |}
const register = (values: RegisterValues): RegisterAction => promisifyAction({ type:REGISTER, values });

//
type LoginValues = {|
    name: string,
    email: string
|}
const LOGIN = A`LOGIN`;
type LoginAction = { type:typeof LOGIN, values:LoginValues, promise:FormPromise, resolve:FormResolve }
const login = (values: LoginValues): LoginAction => promisifyAction({ type:LOGIN, values });

//
function* sessionSaga(): Generator<*, *, *> {
    while (true) {
        const [loginAction, registerAction, verifyAction] = yield race([
            take(LOGIN),
            take(REGISTER),
            take(VERIFY)
        ]);
    }
}
sagas.push(sessionSaga);

//
type Action = PatchAction;

export default function reducer(state: Shape = INITIAL, action:Action): Shape {
    switch(action.type) {
        case PATCH: return { state, ...state.data };
        default: return state;
    }
}

export type { SessionStatus }
export { SS, login, logout, register }
