// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from  './styles'
import STYLES from '../../config/styles'

type Props = {|
    navigation: {|
        state: {|
            params: {|
                id?: AccountId // void is self accout
            |}
        |}
    |}
|}

class ScreenProfile extends Component<Props> {
    static navigationOptions = {
        title: 'Profile'
    }

    render() {
        const {navigation:{state:{params:{ id }}}} = this.props;

        return (
            // <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={STYLES.screen}>
                    <Text>ScreenProfile: {id || 'your profile'}</Text>
                </View>
            // </ScrollView>
        )
    }
}

export default ScreenProfile
