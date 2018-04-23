// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from './styles'

type Props = {|
    label: string,

    color?: Color | Style, // "Subheader color can either be the secondary grey text value (54% black) or the primary color of the app." per https://material.io/guidelines/components/subheaders.html#

    inset?: boolean // https://material.io/guidelines/components/subheaders.html#subheaders-list-subheaders
|}

class MaterialSubheader extends Component {
    render() {
        const { label, color, inset } = this.props;

        const colorStyle = typeof color === 'string' ? { color } : color;

        const style = inset ? styles.subheaderInset : styles.subheader;

        return (
            <View style={style}>
                <Text style={[styles.label, colorStyle]}>{label.toUpperCase()}</Text>
            </View>
        )
    }
}

export default MaterialSubheader
