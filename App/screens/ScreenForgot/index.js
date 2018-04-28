// @flow

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Field } from 'redux-form'
import Button from 'react-native-buttonex'

import { testIfBlank, testIfSameAs, testIfEmail } from '../../utils/rules'

import { LoginNavigatorUtils } from '../../routes/LoginNavigator'
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
        email: [testIfBlank, testIfEmail]
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

class ScreenForgotDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        const { submitting, submit } = this.props;

        return (
            <View style={STYLES.form}>
                <Gap size={4} />
                <Field name="email" component={FieldText} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" placeholder="Email" returnKeyType="go" disableFullscreenUI />
                <Gap size={5} />
                <Button title="Send Password Reset" onPress={submit} />
                <Gap size={5} />
                <View style={styles.bottomButtonWrap}>
                    <Button title="Back" onPress={this.goBack} noBackground />
                </View>
            </View>
        )
    }

    goBack = () => this.props.navigation.goBack()
}

const ScreenForgotFormed = withBaseForm({
    form: 'forgot',
    validate,
    onSubmit: function(values, dispatch, { blurFields, focusField }) {
        blurFields();
    }
})

const ScreenForgot = ScreenForgotFormed(ScreenForgotDumb)

export default ScreenForgot
