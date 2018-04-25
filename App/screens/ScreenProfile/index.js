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

class ScreenProfile extends Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            // <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={STYLES.screen}>
                    <Text>ScreenProfile</Text>
                </View>
            // </ScrollView>
        )
    }
}

export default ScreenProfile
