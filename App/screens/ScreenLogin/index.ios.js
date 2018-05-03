// @flow

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Field } from 'redux-form'
import Button from 'react-native-buttonex'
import { connect } from 'react-redux'

import { testIfBlank, testIfSameAs, testIfEmail } from '../../utils/rules'
import { LoginNavigatorUtils } from '../../routes/LoginNavigator'
import { AppNavigatorUtils } from '../../routes/AppNavigator'
import { login } from '../../store/session'

import withBaseForm from '../../components/withBaseForm'
import FieldText from '../../components/Fields/FieldText'
import Gap from '../../components/Gap'

import styles from  './styles'
import STYLES from '../../config/styles'

import type { FormProps } from 'redux-form'
import type { Shape as AppShape } from '../../store'

type OwnProps = {||}

type ConnectedProps = {|
    ...OwnProps,
    //
    initialValues: {|
        email: string | void
    |}
|}

type Props = {|
    ...ConnectedProps,
    ...FormProps
|}

class ScreenLoginDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        const { invalid, submit, submitFailed, submitting } = this.props;

        return (
            <View style={STYLES.form}>
                <Gap size={4} />
                <Field name="email" component={FieldText} autoCapitalize="none" autoCorrect={false} inputStyle={styles.input} keyboardType="email-address" placeholder="Email" returnKeyType="next" disableFullscreenUI />
                <Gap size={2} />
                <Field name="password" component={FieldText} autoCapitalize="none" inputStyle={styles.input} placeholder="Password" returnKeyType="go" disableFullscreenUI secureTextEntry />
                <Gap size={5} />
                <Button title="Login" onPress={submit} disabled={submitFailed && invalid} loading={submitting} bold />
                <Button title="Forgot Password" onPress={this.gotoForgot} disabled={submitting} noBackground small />
                <View style={styles.registerButtonWrap}>
                    <Button title="Not signed up? Register here!" onPress={this.gotoRegister} disabled={submitting} flat small />
                </View>
            </View>
        )
    }

    gotoForgot = () => LoginNavigatorUtils.getNavigation().navigate({ routeName:'forgot', key:'forgot' })
    gotoRegister = () => LoginNavigatorUtils.getNavigation().navigate({ routeName:'register', key:'register' })
}

const ScreenLoginFormed = withBaseForm({
    form: 'login',
    onSubmit: async function(values, dispatch, { blurFields, focusField, reset }) {
        blurFields();

        await dispatch(login(values)).promise

        AppNavigatorUtils.getNavigation().navigate({ routeName:'home', key:'home' });

        setTimeout(reset, 1000);
    }
}, {
    validateRules: {
        email: [testIfBlank, testIfEmail],
        password: [testIfBlank]
    }
})

const ScreenLoginConnected = connect(
    function({ session:{ email } }: AppShape) {
        return {
            initialValues: {
                email
            }
        }
    }
)

const ScreenLogin = ScreenLoginConnected(ScreenLoginFormed(ScreenLoginDumb))

export default ScreenLogin
