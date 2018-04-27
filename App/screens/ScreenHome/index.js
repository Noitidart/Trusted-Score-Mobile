// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Button from 'react-native-buttonex'

import AppNavigator, { AppNavigatorUtils } from '../../routes/AppNavigator'
import { LoginNavigatorUtils } from '../../routes/LoginNavigator'

import styles from  './styles'
import STYLES from '../../config/styles'

type Props = {|
    navigation: {|
        navigate: Navigate
    |}
|}

class ScreenHome extends Component<Props> {
    static navigationOptions = {
        title: 'Home'
    }

    didFocusProbe = this.props.navigation.addListener('didFocus', () => {
        this.didFocusProbe.remove();
        LoginNavigatorUtils.getNavigation().popToTop();
        delete this.didFocusProbe;
    })

    render() {
        return (
            // <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={STYLES.screen}>
                    <Text>ScreenHome</Text>
                    <Button title="Your Profile" onPress={this.gotoYourProfile} />
                </View>
            // </ScrollView>
        )
    }

    gotoProfile = (id?: AccountId) => AppNavigatorUtils.getNavigation().navigate({ routeName:'profile', key:id, params:{ id } })
    gotoYourProfile = () => this.gotoProfile()
}

export default ScreenHome
