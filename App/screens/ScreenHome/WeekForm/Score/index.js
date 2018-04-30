// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from  './styles'

type Props = {|
    defaultValue?: number
|}

type State = {|
    value?: number
|}

const NO_VALUE_LABEL = '?';

class Score extends Component<Props, State> {
    state = {
        value: undefined
    }

    render() {
        const { value } = this.state;
        const { defaultValue } = this.props;

        return (
            <View style={styles.score}>
                <Text style={styles.scoreText}>
                    { value === undefined ? (defaultValue === undefined ? NO_VALUE_LABEL : defaultValue) : value }
                </Text>
            </View>
        )
    }

    updateScore = (value: number) => this.setState(() => ({ value }))
}

export default Score
