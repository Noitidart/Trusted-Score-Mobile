// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from  './styles'

type Props = {|
    defaultValue?: number
|}

type State = {|
    value?: number | null
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
            <Text style={styles.score}>
                { value === undefined ? ([null, undefined].includes(defaultValue) ? NO_VALUE_LABEL : defaultValue) : value }
            </Text>
        )
    }

    updateScore = (value: number) => this.setState(() => ({ value }))
}

export default Score
