// @flow

import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Button from 'react-native-buttonex'
import { Field } from 'redux-form'

import { LoginNavigatorUtils } from '../../routes/LoginNavigator'
import { checkCode } from '../../store/session'
import { testIfBlank } from '../../utils/rules'

import FieldText from '../../components/Fields/FieldText'
import Gap from '../../components/Gap'
import withBaseForm from '../../components/withBaseForm'

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
        const { invalid, submit, submitFailed, submitting } = this.props;

        return (
            <View style={STYLES.form}>
                <Gap size={4} />
                <Text style={styles.message}>
                    You will receive an email with a reset code and a link. Enter that code here, or press that link, to begin the reset process.
                </Text>
                <Gap size={3} />
                <Field name="code" component={FieldText} autoCapitalize="none" autoCorrect={false} disabled={submitting} placeholder="Code" returnKeyType="go" disableFullscreenUI />
                <Gap size={5} />
                <Button title="Verify Code" onPress={submit} disabled={submitFailed && invalid} loading={submitting} bold />
                <Gap size={5} />
                <Button title="Send Another Code" onPress={this.goBack} disabled={submitting} noBackground small />
                <Gap size={1} />
                <Button title="Back to Login" onPress={this.gotoLogin} disabled={submitting} noBackground small />
            </View>
        )
    }

    gotoLogin = () => LoginNavigatorUtils.getNavigation().popToTop()
    goBack = () => this.props.navigation.goBack()
}

const ScreenForgotConfirmFormed = withBaseForm({
    form: 'code',
    onSubmit: async function(values, dispatch, { blurFields }) {
        blurFields();

        await dispatch(checkCode(values)).promise

        LoginNavigatorUtils.getNavigation().navigate({ routeName:'reset', key:'reset' });
    }
}, {
    validateRules: {
        code: [testIfBlank]
    }
})

const ScreenForgotConfirm = ScreenForgotConfirmFormed(ScreenForgotConfirmDumb)

export default ScreenForgotConfirm
