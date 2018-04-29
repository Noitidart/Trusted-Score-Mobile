// @flow

import URI from 'urijs'

import RCTNetworking from 'RCTNetworking'

import { delay } from 'redux-saga'
import { race, call, select, take } from 'redux-saga/effects'

import { SET_ONLINE, SET_WAS_REALLY_OFFLINE, SET_WAS_NOT_REALLY_OFFLINE_SO_SERVER_WAS_DOWN, SET_SERVER_UP } from './'

import type { NetKind, Host, Shape as NetShape } from './'

export function* testIsOffline(): Generator<void, void, void> {
    const {net:{ isOffline }} = yield select();
    return isOffline;
}

export function* testIsTestingIfReallyOffline(): Generator<void, void, void> {
    const {net:{ isTestingIfReallyOffline }} = yield select();
    return isTestingIfReallyOffline;
}

export function* testIsOfflinish(): Generator<void, void, void> {
    const {net:{ isOffline, isTestingIfReallyOffline }} = yield select();
    return isOffline || isTestingIfReallyOffline;
}

export function* waitIfOfflinish(): Generator<void, void, void> {
    let {net:{ isOffline, isTestingIfReallyOffline }} = yield select();

    if (isOffline || isTestingIfReallyOffline) {
        // yield take(SET_ONLINE);
        console.log('waiting as is offline or testing if really offline');

        if (isTestingIfReallyOffline) {
            ([isOffline] = yield race([take(SET_WAS_REALLY_OFFLINE), take(SET_WAS_NOT_REALLY_OFFLINE_SO_SERVER_WAS_DOWN)]));
        }

        if (isOffline) {
            yield take(SET_ONLINE);
        }

        console.log('done waiting, is no longer offline or testing if really offline');
    }
}

export function* waitIfServerDown(url: String): Generator<void, void, void> {
    const host = getHost(url);
    const { keyIsDown } = getServerNetKeys(host);
    const {net:{ [keyIsDown]:isDown }} = yield select();

    if (isDown) {
        console.log('waiting as server is down for host:', host);
        yield take(action => action.type === SET_SERVER_UP && action.host === host);
        console.log('done waiting, server is online, host:', host);
    }
}

export function* delayUntil(end: UTC): Generator<void, void, void> {
    while (Date.now() < end) {
        yield call(delay, 1000);
    }
}

export function getServerNetKeys(host: Host): { keyIsDown:string, keyStatusMessage:string } {
    return {
        keyIsDown: `${host}_isDown`,
        keyStatusMessage: `${host}_statusMessage`
    }
}

export function getDownHosts(net: NetShape): Host {
    const hosts = [];
    for (const [key, value] of Object.entries(net)) {
        if (key.endsWith('_isDown') && value) {
            // if value is truthy, host is down
            const host = key.substr(0, key.indexOf('_'));
            hosts.push(host);
        }
    }
    return hosts;
}

export function getHost(absoluteUrlOrHost: string): Host {
    // if is realtive, it gets prefixed with http://
    let uri = new URI(absoluteUrlOrHost);
    if (!uri.is('url')) throw new Error(`absoluteUrl is not a URL - "${absoluteUrlOrHost}"`);

    if (!uri.is('absolute')) uri = new URI(`http://${absoluteUrlOrHost}`); // absoluteUrlOrHost is host

    return uri.normalize().host();
}

// resolves with false if nothing to clear. maybe also if error occurs, but i have never seen error
export async function clearCookies(): Promise<boolean> {
    return new Promise(resolve => RCTNetworking.clearCookies(resolve));
}
