// @flow

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Field } from 'redux-form'
import Button from 'react-native-buttonex'

import { testIfBlank, testIfSameAs, testIfEmail } from '../../utils/rules'

import { LoginNavigatorUtils } from '../../routes/LoginNavigator'
import { AppNavigatorUtils } from '../../routes/AppNavigator'
import withBaseForm from '../../components/withBaseForm'
import { register } from '../../store/session'

import FieldText from '../../components/Fields/FieldText'
import Gap from '../../components/Gap'

import styles from  './styles'
import STYLES from '../../config/styles'

import type { FormProps } from 'redux-form'

type OwnProps = {|
    navigation: {|
        goBack: () => void
    |}
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
        const { submitting, submit, anyTouched, invalid } = this.props;

        return (
            <View style={STYLES.form}>
                <Gap size={4} />
                <Field name="email" component={FieldText} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" returnKeyType="next" disableFullscreenUI />
                <Gap size={2} />
                <Field name="name" component={FieldText} autoCapitalize="words" autoCorrect={false} placeholder="Name" returnKeyType="next" disableFullscreenUI />
                <Gap size={2} />
                <Field name="password" component={FieldText} autoCapitalize="none" placeholder="Password" returnKeyType="next" disableFullscreenUI secureTextEntry />
                <Gap size={2} />
                <Field name="password_confirmation" component={FieldText} autoCapitalize="none" placeholder="Repeat Password" returnKeyType="go" disableFullscreenUI secureTextEntry />
                <Gap size={5} />
                <Button title="Sign Up" onPress={submit} disabled={anyTouched && invalid} loading={submitting} />
                <Gap size={5} />
                <View style={STYLES.formBottomButtonWrap}>
                    <Button title="Back" onPress={this.goBack} noBackground />
                </View>
            </View>
        )
    }

    goBack = () => this.props.navigation.goBack()
}

const ScreenRegisterFormed = withBaseForm({
    form: 'register',
    onSubmit: async function(values, dispatch, { blurFields, focusField }) {
        blurFields();

        await dispatch(register(values)).promise;

        AppNavigatorUtils.getNavigation().navigate({ routeName:'home', key:'home' });
    }
}, {
    validateRules: {
        email: [testIfBlank, testIfEmail],
        name: [testIfBlank],
        password: [testIfBlank],
        password_confirmation: [testIfBlank, testIfSameAs('password')]
    }
})

const ScreenRegister = ScreenRegisterFormed(ScreenRegisterDumb)

export default ScreenRegister
