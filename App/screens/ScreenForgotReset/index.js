// @flow

import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Button from 'react-native-buttonex'
import { Field } from 'redux-form'
import withBaseForm from '../../components/withBaseForm'

import { resetPassword } from '../../store/session'
import { testIfBlank, testIfSameAs } from '../../utils/rules'

import Gap from '../../components/Gap'
import FieldText from '../../components/Fields/FieldText'

import styles from  './styles'
import STYLES from '../../config/styles'

import type { FormProps } from 'redux-form'

type OwnProps = {|
    navigation: {|
        goBack: GoBack
    |}
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

        const { submitting, submit, anyTouched, invalid } = this.props;

        return (
            <View style={STYLES.form}>
                <Gap size={4} />
                <Field name="password" component={FieldText} autoCapitalize="none" placeholder="Password" returnKeyType="next" disableFullscreenUI secureTextEntry />
                <Gap size={2} />
                <Field name="password_confirmation" component={FieldText} autoCapitalize="none" placeholder="Repeat Password" returnKeyType="go" disableFullscreenUI secureTextEntry />
                <Gap size={5} />
                <Button title="Reset Password &amp; Login" onPress={submit} disabled={anyTouched && invalid} loading={submitting} />
                <Gap size={5} />
                <View style={STYLES.formBottomButtonWrap}>
                    <Button title="Back" onPress={this.goBack} noBackground />
                </View>
            </View>
        )
    }

    goBack = () => this.props.navigation.goBack()
}

const ScreenForgotResetFormed = withBaseForm({
    form: 'reset',
    onSubmit: async function(values, dispatch, { blurFields, focusField }) {
        blurFields();

        await dispatch(resetPassword(values)).promise;

        AppNavigatorUtils.getNavigation().navigate({ routeName:'home', key:'home' });
    }
}, {
    validateRules: {
        password: [testIfBlank],
        password_confirmation: [testIfBlank, testIfSameAs('password')]
    }
})

const ScreenForgotReset = ScreenForgotResetFormed(ScreenForgotResetDumb)

export default ScreenForgotReset
