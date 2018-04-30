// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import LoginNavigator, { LoginNavigatorUtils } from '../../routes/LoginNavigator'
import { SS } from '../../store/session'

import styles from  './styles'
import STYLES from '../../config/styles'

import type { Shape as AppShape } from '../../store'
import type { SessionStatus } from '../../store/session'

type OwnProps = {||}

type Props = {|
    ...OwnProps,
    // connected
    dispatch: Dispatch,
    status?: SessionStatus
|}

class ScreenLandingDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    constructor(props: Props) {
        super(props);

        LoginNavigatorUtils.getNavigation = this.getNavigation;
    }

    render() {
        const { status } = this.props;
        return (
            // <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={STYLES.screen}>
                    <Text>{status}</Text>
                    { status && status !== SS.VERIFY && <LoginNavigator ref={this.refNavigator} /> }
                </View>
            // </ScrollView>
        )
    }

    refNavigator = el => this.navigator = el
    getNavigation = (): StackNavigation => this.navigator ? this.navigator._navigation : null
}

const ScreenLandingConnected = connect(
    function({session:{ status }}: AppShape) {
        return {
            status
        }
    }
)

const ScreenLanding = ScreenLandingConnected(ScreenLandingDumb)

export default ScreenLanding
