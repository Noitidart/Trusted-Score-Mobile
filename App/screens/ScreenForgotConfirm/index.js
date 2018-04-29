// @flow

import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Button from 'react-native-buttonex'

import { LoginNavigatorUtils } from '../../routes/LoginNavigator'

import styles from  './styles'
import STYLES from '../../config/styles'

import type { FormProps } from 'redux-form'

type OwnProps = {|
    navigation: {
        navigate: Navigate
    }
|}

type Props = {|
    ...OwnProps,
    ...FormProps
|}

class ScreenForgotConfirm extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={STYLES.form}>
                <Text style={styles.message}>
                    {'\n\n\n'}
                    You will now receive an email from us with instructions on how you can set a new password.
                    {'\n\n\n'}
                </Text>
                <Button title="Back to Login" onPress={this.gotoLogin} />
                <Text>{'\n'}</Text>
                <Button title="Send Again" color={CONFIG.trustedblue} onPress={this.goBack} />
            </View>
        )
    }

    gotoLogin = () => LoginNavigatorUtils.getNavigation().popToTop()
}

export default ScreenForgotConfirm
