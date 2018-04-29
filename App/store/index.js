// @flow

import { applyMiddleware, combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'
import { reducer as form } from 'redux-form'
import { fork, all } from 'redux-saga/effects'

import background, { sagas as backgroundSagas } from './background'
import counter, { sagas as counterSagas } from './counter'
import device, { sagas as deviceSagas } from './device'
import net, { sagas as netSagas } from './net'
import session, { sagas as sessionSagas, transform as sessionTransform } from './session'

import type { Shape as BackgroundShape } from './background'
import type { Shape as CounterShape } from './counter'
import type { Shape as DeviceShape } from './device'
import type { Shape as NetShape } from './net'
import type { Shape as SessionShape } from './session'

export type Shape = {
    _persist: { version:number, rehydrated:boolean },
    background: BackgroundShape,
    counter: CounterShape,
    form: *,
    session: SessionShape
}

console.log('process.env.NODE_ENV:', process.env.NODE_ENV, process.env.NODE_ENV !== 'production');
const persistConfig = {
    key: 'primary',
    debug: process.env.NODE_ENV !== 'production',
    whitelist: ['counter', 'session'],
    storage,
    transforms: [ sessionTransform ]
}

const sagaMiddleware = createSagaMiddleware();
let enhancers = applyMiddleware(sagaMiddleware);
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(enhancers);

const reducers = persistReducer(persistConfig, combineReducers({ background, counter, device, form, net, session }));
const sagas = [ ...backgroundSagas, ...counterSagas, ...deviceSagas, ...sessionSagas, ...netSagas ];

const store = createStore(reducers, enhancers);

export const persistor = persistStore(store);
// persistor.purge();

function* rootSaga() {
    yield all(sagas.map(saga => fork(saga)));
}
sagaMiddleware.run(rootSaga);

// store.subscribe(function() {
//     console.log('store updated:', store.getState());
// })

export default store
