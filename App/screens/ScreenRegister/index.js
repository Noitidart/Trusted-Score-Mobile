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

class ScreenRegisterDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={STYLES.form}>
                <Text>ScreenRegister</Text>
            </View>
        )
    }
}

function validate(values) {
    const errors = {};

    return errors;
}

const ScreenRegisterFormed = reduxForm({
    form: 'register',
    validate
})

const ScreenRegister = ScreenRegisterFormed(ScreenRegisterDumb)

export default ScreenRegister
