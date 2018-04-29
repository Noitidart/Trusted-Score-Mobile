// @flow

import { delay } from 'redux-saga'
import { takeEvery, take, call, put, race } from 'redux-saga/effects'
import { createTransform } from 'redux-persist'
import { omit } from 'lodash'

import { getSubmissionErrorFromLaravelReply, withPromise } from '../utils'
import fetchApi from '../net/fetchApi'

export type Shape = {|
    status?: SessionStatus, // never persisted
    email: string,
    id: AccountId,
    token?: string
|};

const INITIAL = {};
export const sagas = [];

export const transform = createTransform(
    (state, key) => state,                 // transform state GOING from redux on its way to being serialized and stored
    (state, key) => omit(state, 'status'), // transform state COMING from storage, on its way to be rehydrated into redux
    { whitelist:['session'] }
)

const A = ([actionType]: string[]) => 'SESSION_' + actionType; // Action type prefixer

type AccountId = number;
type FormResolution = void;
type FormResolve = FormResolution => void;
type FormReject = SubmissionErrorType => void;
type FormPromise = Promise<FormResolution>;

const SS = {
    STARTUP: 'STARTUP', // reading redux-perist file, maybe wait for devic things?
    VERIFY: 'VERIFY', // testing if apiToken is expired
    EXPIRED: 'EXPIRED',
    OK: 'OK',
    OUT: 'OUT'
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
type VerifyResolution = boolean; // true if active, false if expired
type VerifyResolve = VerifyResolution => void;
type VerifyPromise = Promise<VerifyResolution>
const VERIFY = A`VERIFY`;
type VerifyAction = {| type:typeof VERIFY, promise:VerifyPromise, resolve:VerifyResolve, reject:null |}
const verify = (): VerifyAction => withPromise({ type:VERIFY, reject:null });

//
type RegisterValues = {|
    email: string,
    name: string,
    password: string,
    password_confirmation: string
|}
const REGISTER = A`REGISTER`;
type RegisterAction = {| type:typeof REGISTER, values:RegisterValues, promise:FormPromise, resolve:FormResolve, reject:FormReject |}
const register = (values: RegisterValues): RegisterAction => withPromise({ type:REGISTER, values });

//
type LoginValues = {|
    name: string,
    email: string
|}
const LOGIN = A`LOGIN`;
type LoginAction = { type:typeof LOGIN, values:LoginValues, promise:FormPromise, resolve:FormResolve, reject:FormReject }
const login = (values: LoginValues): LoginAction => withPromise({ type:LOGIN, values });

//
type ForgotValues = {|
    email: string
|}
const FORGOT = A`FORGOT`;
type ForgotAction = { type:typeof FORGOT, values:ForgotValues, promise:FormPromise, resolve:FormResolve, reject:FormReject }
const forgot = (values: ForgotValues): ForgotAction => withPromise({ type:FORGOT, values });

//
type ResetValues = {|
    password: string,
    password_confirmation: string
|}
const RESET = A`RESET`;
type ResetAction = { type:typeof RESET, values:ResetValues, promise:FormPromise, resolve:FormResolve, reject:FormReject }
const reset = (values: ResetValues): ResetAction => withPromise({ type:RESET, values });

//
function* sessionSaga(): Generator<*, *, *> {
    while (true) {
        const [ loginAction, registerAction, verifyAction ] = yield race([
            take(LOGIN),
            take(REGISTER),
            take(VERIFY)
        ]);

        const { type, resolve, reject, values:body } = loginAction || registerAction || verifyAction;
        console.log('type:', type, 'body:', body);

        const { status, reply } = (registerAction && (yield call(fetchApi, 'register' , { method:'POST', body }))) ||
                                  (loginAction    && (yield call(fetchApi, 'login'    , { method:'POST', body }))) ||
                                  (verifyAction   && (yield call(fetchApi, 'user'     , { method:'GET'        })));

        if ([200, 201].includes(status)) { // 201 for register
            const { api_token:token, email, id } = reply;
            fetchApi.TOKEN = token;
            yield put(patch({ email, id, status:SS.OK, token }));
            resolve();
        } else {
            if (verifyAction) {
                // really only if status === 401, but for now just if any error, mark it as out
                yield put(patch({ status:SS.OUT }));
                resolve();
            } else {
                reject(getSubmissionErrorFromLaravelReply(reply, status));
            }
        }
    }
}
sagas.push(sessionSaga);

function* registerTask({}: RegisterAction): Generator<*, *, *> {

}

function* loginTask({}: LoginAction): Generator<*, *, *> {

}

function* verifyTask({}: VerifyAction): Generator<*, *, *> {

}

//
type Action = PatchAction;

export default function reducer(state: Shape = INITIAL, action:Action): Shape {
    switch(action.type) {
        case PATCH: return { state, ...state.data };
        default: return state;
    }
}

export type { SessionStatus }
export { SS, login, logout, register, forgot as forgotPassword, reset as resetPassword }
