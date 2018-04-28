// @flow

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Field } from 'redux-form'
import Button from 'react-native-buttonex'

import { testIfBlank, testIfSameAs, testIfEmail } from '../../utils/rules'

import { LoginNavigatorUtils } from '../../routes/LoginNavigator'
import { AppNavigatorUtils } from '../../routes/AppNavigator'
import withBaseForm from '../../components/withBaseForm'

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

function validate(valuen) {
    const errorn = {};

    const rulesn = {
        email: [testIfBlank, testIfEmail],
        name: [testIfBlank],
        password: [testIfBlank],
        password_confirmation: [testIfBlank, testIfSameAs('password')]
    }

    for (const [name, rules] of Object.entries(rulesn)) {
        const value = valuen[name];
        for (const rule of rules) {
            const error = rule(value, valuen);
            errorn[name] = error;
            if (error) break;
        }
    }

    return errorn;
}

class ScreenRegisterDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        const { submitting, submit } = this.props;

        return (
            <View style={STYLES.form}>
                <Gap size={4} />
                <Field name="email" component={FieldText} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" returnKeyType="next" disableFullscreenUI />
                <Gap size={2} />
                <Field name="name" component={FieldText} autoCapitalize="word" autoCorrect={false} placeholder="Name" returnKeyType="next" disableFullscreenUI />
                <Gap size={2} />
                <Field name="password" component={FieldText} placeholder="Password" returnKeyType="next" disableFullscreenUI />
                <Gap size={2} />
                <Field name="password_cofirmation" component={FieldText} placeholder="Repeat Password" returnKeyType="go" disableFullscreenUI />
                <Gap size={5} />
                <Button title="Sign Up" onPress={submit} />
                <Gap size={5} />
                <View style={styles.bottomButtonWrap}>
                    <Button title="Back" onPress={this.goBack} noBackground />
                </View>
            </View>
        )
    }

    goBack = () => this.props.navigation.goBack()
}

const ScreenRegisterFormed = withBaseForm({
    form: 'register',
    validate,
    onSubmit: function(values, dispatch, { blurFields, focusField }) {
        blurFields();
        AppNavigatorUtils.getNavigation().navigate({ routeName:'home', key:'home' });
    }
})

const ScreenRegister = ScreenRegisterFormed(ScreenRegisterDumb)

export default ScreenRegister
