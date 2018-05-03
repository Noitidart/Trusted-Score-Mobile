// @flow

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Field } from 'redux-form'
import Button from 'react-native-buttonex'

import { testIfBlank, testIfSameAs, testIfEmail, testIfMinLength } from '../../utils/rules'

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
            <View style={styles.form}>
                <Gap size={4} />

                <View style={STYLES.iosTableGroup}>
                    <View style={STYLES.iosTableGroupInner}>
                        <View style={STYLES.iosTableLabels}>
                            <Text style={STYLES.iosTableLabel} onPress={this.focusEmail}>Email</Text>
                            <Text style={STYLES.iosTableLabel} onPress={this.focusName}>Name</Text>
                        </View>
                        <View style={STYLES.iosTableFields}>
                            <Field name="email" component={FieldText} style={STYLES.iosTableField} autoCapitalize="none" autoCorrect={false} inputStyle={STYLES.iosTableInput} keyboardType="email-address" placeholder="required" returnKeyType="next" disableFullscreenUI />
                            <View style={[styles.dividerInset, { top:43 }]} />
                            <Field name="name" component={FieldText} style={STYLES.iosTableField} autoCapitalize="words" autoCorrect={false} inputStyle={STYLES.iosTableInput} placeholder="required" returnKeyType="next" disableFullscreenUI />
                        </View>
                    </View>
                    <View style={STYLES.iosTableFooter}>

                    </View>
                </View>

                <View style={STYLES.iosTableGroup}>
                    <View style={STYLES.iosTableGroupInner}>
                        <View style={STYLES.iosTableLabels}>
                            <Text style={STYLES.iosTableLabel} onPress={this.focusPassword}>Password</Text>
                            <Text style={STYLES.iosTableLabel} onPress={this.focusPasswordConfirmation}>Repeat Password</Text>
                        </View>
                        <View style={STYLES.iosTableFields}>
                            <Field name="password" component={FieldText} style={STYLES.iosTableField} autoCapitalize="none" inputStyle={STYLES.iosTableInput} placeholder="required" returnKeyType="next" disableFullscreenUI secureTextEntry />
                            <View style={[styles.dividerInset, { top:43 }]} />
                            <Field name="password_confirmation" component={FieldText} style={STYLES.iosTableField} autoCapitalize="none" inputStyle={STYLES.iosTableInput} placeholder="required" returnKeyType="go" disableFullscreenUI secureTextEntry />
                        </View>
                    </View>
                    <View style={STYLES.iosTableFooter}>
                        <Text style={STYLES.iosTableFooterText}>Password must be at least 6 characters.</Text>
                    </View>
                </View>

                <Gap size={5} />
                <Button title="Sign Up" onPress={submit} disabled={anyTouched && invalid} loading={submitting} bold />
                <Gap size={5} />
                <View style={STYLES.formBottomButtonWrap}>
                    <Button title="Back" onPress={this.goBack} noBackground />
                </View>
            </View>
        )
    }

    focusEmail = () => this.props.focusField('email')
    focusName = () => this.props.focusField('name')
    focusPassword = () => this.props.focusField('password')
    focusPasswordConfirmation = () => this.props.focusField('password_confirmation')

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
        password: [testIfBlank, testIfMinLength(6)],
        password_confirmation: [testIfBlank, testIfSameAs('password')]
    }
})

const ScreenRegister = ScreenRegisterFormed(ScreenRegisterDumb)

export default ScreenRegister
