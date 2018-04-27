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
    navigation: {
        navigate: Navigate
    }
|}

type Props = {|
    ...OwnProps,
    ...FormProps
|}

function validate(values) {
    const errors = {};

    return errors;
}

class ScreenLoginDumb extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        const { submitting, submit } = this.props;

        return (
            <View style={STYLES.form}>
                <Gap size={4} />
                <Field name="email" component={FieldText} returnKeyType="next" disableFullscreenUI />
                <Gap size={2} />
                <Field name="password" component={FieldText} returnKeyType="go" style={{ backgroundColor:'steelblue' }} disableFullscreenUI />
                <Gap size={5} />
                <Button title="Login" onPress={submit} />
                <Gap size={2} />
                <Button title="I forgot my password" disabled={submitting} onPress={this.gotoForgot} noBackground />
                <View style={styles.registerWrap}>
                    <Button title="Not Signed Up? Register Now" onPress={this.gotoRegister} flat />
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
    validate,
    onSubmit: function(values, dispatch, { blurFields }) {
        blurFields();
    }
})

const ScreenLogin = ScreenLoginFormed(ScreenLoginDumb)

export default ScreenLogin
