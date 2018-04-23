// @flow

import { Dimensions } from 'react-native'
import { channel, buffers } from 'redux-saga'
import { takeEvery, put } from 'redux-saga/effects'
import DeviceInfo from 'react-native-device-info'

import updateTimeFormat from '../../utils/updateTimeFormat'

export type Shape = {||} | {|
    width: number,
    height: number,
    screenHeight: number,
    screenWidth: number,
    isPortrait: number,
    is24Hour: boolean
|}

const INITIAL = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    widthScreen: Dimensions.get('window').width,
    heightScreen: Dimensions.get('window').height,
    isPortrait: Dimensions.get('screen').width < Dimensions.get('screen').height,
    is24Hour: DeviceInfo.is24Hour()
};
export const sagas = [];

const A = ([actionType]: string[]) => 'DEVICE_' + actionType; // Action type prefixer

//
const PATCH = A`PATCH`;
type PatchAction = { type: typeof PATCH, data: $Shape<Shape> };
const patch = (data: $Shape<Shape>): PatchAction => ({ type:PATCH, data });

//
type DimensionsMessage = {
    screen: { width:number, height:number },
    window: { width:number, height:number }
}

const dimChan = channel(buffers.sliding(1));
Dimensions.addEventListener('change', nativeEvent => dimChan.put({ nativeEvent }) );

function* dimChanWorker({ nativeEvent }: DimensionsMessage): Generator<void, void, *> {
    console.log('dimChanWorker, nativeEvent:', nativeEvent);
    const {window:{ width, height },screen:{ width:widthScreen, height:heightScreen }} = nativeEvent;
    yield put(patch({
        width,
        height,
        widthScreen,
        heightScreen,
        isPortrait: widthScreen < heightScreen
    }))
}
function* dimChanWatcher() {
    yield takeEvery(dimChan, dimChanWorker);
}
sagas.push(dimChanWatcher);

//
// TODO: watch for format changes
updateTimeFormat(DeviceInfo.is24Hour());

//
type Action = PatchAction;

export default function reducer(state: Shape = INITIAL, action:Action): Shape {
    switch(action.type) {
        case PATCH: return { state, ...state.data };
        default: return state;
    }
}
