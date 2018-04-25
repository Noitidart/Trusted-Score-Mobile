// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'

import LoginNavigator, { LoginNavigatorUtils } from '../../routes/LoginNavigator'

import styles from  './styles'
import STYLES from '../../config/styles'

type Props = {||}

class ScreenLanding extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    constructor(props: Props) {
        super(props);

        LoginNavigatorUtils.getNavigation = this.getNavigation;
    }

    render() {
        return (
            // <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={STYLES.screen}>
                    <Text>ScreenLanding</Text>
                    <LoginNavigator ref={this.refNavigator} />
                </View>
            // </ScrollView>
        )
    }

    refNavigator = el => this.navigator = el
    getNavigation = (): StackNavigation => this.navigator ? this.navigator._navigation : null
}

export default ScreenLanding
