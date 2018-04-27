// @flow

import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Field } from 'redux-form'
import Button from 'react-native-buttonex'

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

function validate(values) {
    const errors = {};

    return errors;
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
                <Field name="email" component={FieldText} placeholder="Email" returnKeyType="next" disableFullscreenUI />
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
    gotoForgot = () => {
        this.props.blurFields();
        LoginNavigatorUtils.getNavigation().navigate({ routeName:'forgot', key:'forogt' })
    }
    gotoRegister = () => {
        this.props.blurFields();
        LoginNavigatorUtils.getNavigation().navigate({ routeName:'register', key:'register' })
    }
}

const ScreenRegisterFormed = withBaseForm({
    form: 'register',
    validate,
    onSubmit: function(values, dispatch, { blurFields, focusField }) {
        blurFields();
    }
})

const ScreenRegister = ScreenRegisterFormed(ScreenRegisterDumb)

export default ScreenRegister
