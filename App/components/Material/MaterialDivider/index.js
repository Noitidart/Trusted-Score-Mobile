// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import styles from './styles'

type Props = {|
    inset?: boolean,
    dark?: boolean
|}

class MaterialDivider extends Component {
    render() {
        const { inset, dark } = this.props;

        return <View style={[styles.divider, inset && styles.inset, dark && styles.dark]} />
    }
}

export default MaterialDivider
