// @flow

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { reduxForm, Field } from 'redux-form'
import Button from 'react-native-buttonex'

import { LoginNavigatorUtils } from '../../routes/LoginNavigator'

import FieldText from '../../components/Fields/FieldText'

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

class ScreenLoginDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        const { submitting } = this.props;

        return (
            <View style={STYLES.form}>
                <Field name="email" component={FieldText} />
                <Field name="password" component={FieldText} />
                <Button title="Login" onPress={this.handleBlurSubmit} />
                <Button title="Register" onPress={this.gotoRegister} />
                <Button title="I forgot my password" disabled={submitting} onPress={this.gotoForgot} />
            </View>
        )
    }

    gotoForgot = () => LoginNavigatorUtils.getNavigation().navigate({ routeName:'forgot', key:'forogt' })
    gotoRegister = () => LoginNavigatorUtils.getNavigation().navigate({ routeName:'register', key:'register' })
}

function validate(values) {
    const errors = {};

    return errors;
}

const ScreenLoginFormed = reduxForm({
    form: 'login',
    validate
})

const ScreenLogin = ScreenLoginFormed(ScreenLoginDumb)

export default ScreenLogin
