// @flow

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Field } from 'redux-form'
import Button from 'react-native-buttonex'
import { connect } from 'react-redux'

import { testIfBlank, testIfEmail } from '../../utils/rules'

import { LoginNavigatorUtils } from '../../routes/LoginNavigator'
import withBaseForm from '../../components/withBaseForm'
import { forgotPassword } from '../../store/session'

import FieldText from '../../components/Fields/FieldText'
import Gap from '../../components/Gap'

import styles from  './styles'
import STYLES from '../../config/styles'

import type { FormProps } from 'redux-form'

type OwnProps = {|
    navigation: {|
        goBack: GoBack
    |}
|}

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

class ScreenForgotDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        const { submitting, submit, anyTouched, invalid } = this.props;

        return (
            <View style={STYLES.form}>
                <Gap size={4} />
                <Field name="email" component={FieldText} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" returnKeyType="go" disableFullscreenUI />
                <Gap size={5} />
                <Button title="Send Password Reset" onPress={submit} disabled={anyTouched && invalid} loading={submitting} />
                <Gap size={5} />
                <View style={STYLES.formBottomButtonWrap}>
                    <Button title="Back" onPress={this.goBack} noBackground />
                </View>
            </View>
        )
    }

    goBack = () => this.props.navigation.goBack()
}

const ScreenForgotFormed = withBaseForm({
    form: 'forgot',
    onSubmit: async function(values, dispatch, { blurFields, focusField }) {
        blurFields();

        // await dispatch(forgotPassword(values)).promise;

        LoginNavigatorUtils.getNavigation().navigate({ routeName:'forgot_confirm', key:'forgot_confirm' })
    }
}, {
    validateRules: {
        email: [testIfBlank, testIfEmail]
    }
})

const ScreenForgotConnected = connect(
    function({ session:{ email } }: AppShape) {
        return {
            initialValues: {
                email
            }
        }
    }
)

const ScreenForgot = ScreenForgotConnected(ScreenForgotFormed(ScreenForgotDumb))

export default ScreenForgot
