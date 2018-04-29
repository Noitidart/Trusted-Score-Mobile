// @flow

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Field } from 'redux-form'
import Button from 'react-native-buttonex'

import { testIfBlank, testIfSameAs, testIfEmail } from '../../utils/rules'

import { LoginNavigatorUtils } from '../../routes/LoginNavigator'
import { AppNavigatorUtils } from '../../routes/AppNavigator'
import withBaseForm from '../../components/withBaseForm'
import { login } from '../../store/session'

import FieldText from '../../components/Fields/FieldText'
import Gap from '../../components/Gap'

import styles from  './styles'
import STYLES from '../../config/styles'

import type { FormProps } from 'redux-form'

type OwnProps = {||}

type Props = {|
    ...OwnProps,
    ...FormProps
|}

class ScreenLoginDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        const { submitting, submit, invalid, anyTouched } = this.props;

        return (
            <View style={STYLES.form}>
                <Gap size={4} />
                <Field name="email" component={FieldText} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" returnKeyType="next" disableFullscreenUI />
                <Gap size={2} />
                <Field name="password" component={FieldText} autoCapitalize="none" placeholder="Password" returnKeyType="go" disableFullscreenUI secureTextEntry />
                <Gap size={5} />
                <Button title="Login" onPress={submit} disabled={anyTouched && invalid} loading={submitting} />
                <Gap size={2} />
                <Button title="I forgot my password" disabled={submitting} onPress={this.gotoForgot} noBackground />
                <View style={styles.registerButtonWrap}>
                    <Button title="Not Signed Up? Register Now" onPress={this.gotoRegister} disabled={submitting} flat />
                </View>
            </View>
        )
    }

    gotoForgot = () => {
        this.props.blurFields();
        LoginNavigatorUtils.getNavigation().navigate({ routeName:'forgot', key:'forogt' })
    }
    gotoRegister = () => {
        this.props.blurFields();
        LoginNavigatorUtils.getNavigation().navigate({ routeName:'register', key:'register' })
    }
}

const ScreenLoginFormed = withBaseForm({
    form: 'login',
    onSubmit: async function(values, dispatch, { blurFields, focusField }) {
        blurFields();

        await dispatch(login(values)).promise

        AppNavigatorUtils.getNavigation().navigate({ routeName:'home', key:'home' });
    }
}, {
    validateRules: {
        email: [testIfBlank, testIfEmail],
        password: [testIfBlank]
    }
})

const ScreenLogin = ScreenLoginFormed(ScreenLoginDumb)

export default ScreenLogin
