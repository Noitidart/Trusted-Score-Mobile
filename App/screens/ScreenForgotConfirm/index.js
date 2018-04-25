// @flow

import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { reduxForm } from 'redux-form'

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

class ScreenForgotConfirmDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={STYLES.form}>
                <Text>ScreenForgotConfirm</Text>
            </View>
        )
    }
}

function validate(values) {
    const errors = {};

    return errors;
}

const ScreenForgotConfirmFormed = reduxForm({
    form: 'forgot',
    validate
})

const ScreenForgotConfirm = ScreenForgotConfirmFormed(ScreenForgotConfirmDumb)

export default ScreenForgotConfirm
