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

class ScreenForgotResetDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={STYLES.form}>
                <Text>ScreenForgotReset</Text>
            </View>
        )
    }
}

function validate(values) {
    const errors = {};

    return errors;
}

const ScreenForgotResetFormed = reduxForm({
    form: 'forgot',
    validate
})

const ScreenForgotReset = ScreenForgotResetFormed(ScreenForgotResetDumb)

export default ScreenForgotReset
