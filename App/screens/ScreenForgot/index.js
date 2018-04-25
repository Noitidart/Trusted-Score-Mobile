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

class ScreenForgotDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={STYLES.form}>
                <Text>ScreenForgot</Text>
            </View>
        )
    }
}

function validate(values) {
    const errors = {};

    return errors;
}

const ScreenForgotFormed = reduxForm({
    form: 'forgot',
    validate
})

const ScreenForgot = ScreenForgotFormed(ScreenForgotDumb)

export default ScreenForgot
