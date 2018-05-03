// @flow

import { delay } from 'redux-saga'
import { call, fork, put, race, select, take, takeEvery } from 'redux-saga/effects'
import { createTransform } from 'redux-persist'
import { SET_SUBMIT_SUCCEEDED } from 'redux-form/es/actionTypes'
import { omit, assignWith } from 'lodash'
import { pickAsByString } from 'cmn/src/all'

import { getSubmissionErrorFromLaravelReply, withPromise, waitRehydrate } from '../utils'
import fetchApi from '../net/fetchApi'
import { AppNavigatorUtils } from '../../routes/AppNavigator'
import { FORM as WEEK_FORM_NAME } from '../../screens/ScreenHome/WeekForm'

export type Shape = {|
    status?: SessionStatus, // never persisted
    user: User,
    email: string,
    token?: string
|} | {||};

const INITIAL = {};
export const sagas = [];

export const transform = createTransform(
    (state, key) => state,                 // transform state GOING from redux on its way to being serialized and stored
    (state, key) => omit(state, 'status'), // transform state COMING from storage, on its way to be rehydrated into redux
    { whitelist:['session'] }
)

const A = ([actionType]: string[]) => 'SESSION_' + actionType; // Action type prefixer

type Score = {|
    id: number,
    userId: UserId,
    comment: null | string,
    value: number,
    createdAt: DateIso, // TODO:
    updatedAt: DateIso
|}
type ScoreId = $PropertyType<Score, 'id'>

type User = {|
    id: number,
    name: string,
    avatarPath: string | null,
    score: Score | void
|}
type UserId = $PropertyType<User, 'id'>

type FormResolution = void;
type FormResolve = FormResolution => void;
type FormReject = SubmissionErrorType => void;
type FormPromise = Promise<FormResolution>;

const SS = {
    // undefined means - STARTUP: 'STARTUP', // reading redux-perist file, maybe wait for devic things?
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
type CheckCodeValues = {|
    code: string
|}
const CHECK_CODE = A`CHECK_CODE`;
type CheckCodeAction = { type:typeof CHECK_CODE, values:CheckCodeValues, promise:FormPromise, resolve:FormResolve, reject:FormReject }
const checkCode = (values: CheckCodeValues): CheckCodeAction => withPromise({ type:CHECK_CODE, values });

//
function* sessionSaga(): Generator<*, *, *> {

    yield waitRehydrate();

    while (!AppNavigatorUtils.getNavigation || !AppNavigatorUtils.getNavigation()) yield call(delay, 200);
    console.log('ok got navigation');

    {
        const {session:{ token }} = yield select();

        if (token) {
            yield put(patch({ status:SS.VERIFY }));
            yield fork(function*() {
                yield delay(0);
                console.log('doing verify now');
                yield put(verify());
            });
        } else {
            yield put(patch({ status:SS.OUT }));
        }
    }

    while (true) {
        const [ loginAction, registerAction, verifyAction ] = yield race([
            take(LOGIN),
            take(REGISTER),
            take(VERIFY) // TODO: dont listen to this after first time
        ]);

        const { type, resolve, reject, values:body } = loginAction || registerAction || verifyAction;

        console.log('type:', type);
        if (type === LOGIN) yield put(patch({ email:body.email }));

        const { status, reply } = (registerAction && (yield call(fetchApi, 'register' , { method:'POST', body }))) ||
                                  (loginAction    && (yield call(fetchApi, 'login'    , { method:'POST', body }))) ||
                                  (verifyAction   && (yield call(fetchApi, 'user'     , { method:'GET'        })));

        if ([200, 201].includes(status)) { // 201 for register
            const { api_token:token, email, ...userRaw } = reply;

            yield put(patch({
                status:SS.OK,
                email,
                token,
                user: getUser(userRaw)
            }));

            if (type === VERIFY) AppNavigatorUtils.getNavigation().navigate({ routeName:'home', key:'home' });
            resolve();

            yield take(LOGOUT);

            yield put(patch({ status:SS.OUT, token:undefined, user:undefined }));
        } else {
            if (type === VERIFY) {
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

//
function* forgotTask(): Generator<*, *, *> {
    while (true) {
        const { values } = yield take(FORGOT);

        yield put(patch({ email:values.email }));

    }
}

//
function* checkCodeTask(): Generator<*, *, *> {
    while (true) {
        const { values } = yield take(CHECK_CODE);

    }
}

//
function* resetTask(): Generator<*, *, *> {
    while (true) {
        const { values } = yield take(RESET);

    }
}

//
type WeekFormValues = {|
    name: string,
    score?: number,
    comment?: string
|}
const SUBMIT_WEEK_FORM = A`SUBMIT_WEEK_FORM`;
type SubmitWeekFormAction = { type:typeof SUBMIT_WEEK_FORM, values:WeekFormValues, promise:FormPromise, resolve:FormResolve, reject:FormReject }
const submitWeekForm = (values: WeekFormValues): SubmitWeekFormAction => withPromise({ type:SUBMIT_WEEK_FORM, values });

function* submitWeekFormWorker({ values, resolve }: SubmitWeekFormAction): Generator<*, *, *> {
    console.log('submitWeekFormWorker :: values:', values);

    const { reply, status } = yield fetchApi('user', {
        method: 'post',
        body: {
            name: values.name,
            score: {
                value: values.score,
                comment: values.comment
            }
        }
    });

    resolve();

    if (status === 200) {
        // wait for submitting to get flipped to false
        yield take(action => action.type === SET_SUBMIT_SUCCEEDED && action.meta.form === WEEK_FORM_NAME);

        const userRaw = reply;
        const user = getUser(userRaw);

        yield put(patch({ user }));
    }
}
function* submitWeekFormWatcher(): Generator<*, *, *> {
    yield takeEvery(SUBMIT_WEEK_FORM, submitWeekFormWorker);
}
sagas.push(submitWeekFormWatcher);

//
type FetchWeekUsersResolution = Score[];
type FetchWeekUsersResolve = FetchWeekUsersResolution => void;
type FetchWeekUsersReject = string[] => void;
type FetchWeekUsersPromise = Promise<FetchWeekUsersResolution>
const FETCH_WEEK_SCORES = A`FETCH_WEEK_SCORES`;
type FetchWeekUsersAction = { type:typeof FETCH_WEEK_SCORES, values:WeekFormValues, promise:FetchWeekUsersPromise, resolve:FetchWeekUsersResolve, reject:FetchWeekUsersReject }
const fetchWeekUsers = (values: WeekFormValues): SubmitWeekFormAction => withPromise({ type:FETCH_WEEK_SCORES });

function* fetchWeekUsersWorker({ resolve, reject }: SubmitWeekFormAction): Generator<*, *, *> {

    const { reply, status } = yield fetchApi('week/users');

    if (status === 200) {
        const users = reply.map(userRaw => getUser(userRaw));

        // TODO: if sessionUserId is in it, then update yield put patch session.user
        resolve(users);
    } else {
        console.log('fetchWeekUsersWorker :: bad status reply:', reply);
        reject(`Unhandled response received from server. Status code: ${status}.`);
    }
}
function* fetchWeekUsersWatcher(): Generator<*, *, *> {
    yield takeEvery(FETCH_WEEK_SCORES, fetchWeekUsersWorker);
}
sagas.push(fetchWeekUsersWatcher);

//
type Action = PatchAction;

export default function reducer(state: Shape = INITIAL, action:Action): Shape {
    switch(action.type) {
        case PATCH: {

            let userNext;
            if (action.data.hasOwnProperty('user')) {
                if (action.data.user) {
                    const user = state.user;
                    userNext = {
                        ...(user || {}),
                        ...action.data.user
                    }

                    if (action.data.user.hasOwnProperty('score')) {
                        if (action.data.user.score) {
                            const score = ((state.user || {}).score);
                            scoreNext = {
                                ...(score || {}),
                                ...action.data.user.score
                            }
                        } else {
                            scoreNext = action.data.user.score;
                        }
                        userNext.score = scoreNext;
                    }
                } else {
                    userNext = action.data.user;
                }
            }

            return {
                ...state,
                ...action.data,
                user: userNext
            }
        }
        default: return state;
    }
}

function getScore(scoreRaw: null | {}): Score | void {
    // scoreRaw is null from backend, not undefined
    if (!scoreRaw) {
        return undefined;
    } else {
        // console.log('getScore ::', pickAsByString(scoreRaw,
        //     'id',
        //     'user_id as userId',
        //     'value',
        //     'comment',
        //     'created_at as createdAt',
        //     'updated_at as updatedAt'
        // ));
        return pickAsByString(scoreRaw,
            'id',
            'user_id as userId',
            'value',
            'comment',
            'created_at as createdAt',
            'updated_at as updatedAt'
        )
    }
}
function getUser(userRaw:{}): User {
    const scoreRaw = userRaw.score;
    // console.log('getUser:', ({
    //     ...pickAsByString(userRaw,
    //         'id',
    //         'name',
    //         'avatar_path as avatarPath'
    //     ),
    //     score: getScore(scoreRaw)
    // }));
    return ({
        ...pickAsByString(userRaw,
            'id',
            'name',
            'avatar_path as avatarPath'
        ),
        score: getScore(scoreRaw)
    });
}

export type { SessionStatus, Score, User, UserId, ScoreId }
export { SS, login, logout, register, forgot as forgotPassword, reset as resetPassword, checkCode, submitWeekForm, fetchWeekUsers }
