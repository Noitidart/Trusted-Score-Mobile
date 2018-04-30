// @flow

import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import tinycolor from 'tinycolor2'

import COLOR from '../../config/color';
import AppNavigator, { AppNavigatorUtils } from '../../routes/AppNavigator'
import { LoginNavigatorUtils } from '../../routes/LoginNavigator'

import ScoreItem from './ScoreItem'
import WeekForm from './WeekForm'

import styles from  './styles'
import STYLES from '../../config/styles'

type Props = {|
    navigation: {|
        navigate: Navigate
    |}
|}

class ScreenHome extends Component<Props> {
    static navigationOptions = {
        title: 'Trusted Score'
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
                    <WeekForm />
                    <ScoreItem name="Noitidart" score="9.6" updatedAt="5 min" pressPayload={{ id:1 }} onPress={this.handleScoreItemPress} />
                    <ScoreItem name="Yasir Khalid Ali" score="10" message="Was a very long long long long long long long week!!!" updatedAt="2 days" pressPayload={{ id:2 }} onPress={this.handleScoreItemPress} />
                </View>
            // </ScrollView>
        )
    }

    gotoProfile = (id?: AccountId) => AppNavigatorUtils.getNavigation().navigate({ routeName:'profile', key:id, params:{ id } })
    gotoYourProfile = () => this.gotoProfile()

    handleScoreItemPress = ({ id }, kind) => {
        console.log('kind:', kind, 'id:', id);
    }
}

export default ScreenHome
