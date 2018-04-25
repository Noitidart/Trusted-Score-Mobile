// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from  './styles'
import STYLES from '../../config/styles'

type Props = {
    navigation: {
        navigate: Navigate
    }
}

class ScreenHome extends Component<Props> {
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            // <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={STYLES.screen}>
                    <Text>ScreenHome</Text>
                </View>
            // </ScrollView>
        )
    }
}

export default ScreenHome
