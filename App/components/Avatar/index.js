// @flow

import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import tinycolor from 'tinycolor2'

import COLOR from '../../config/color';
import { hashStringToColor } from '../../utils/hash'
import { getInitials } from '../../utils/forum'

import styles from  './styles'

type Props = {|
    name?: string,
    size: number,
    fontSize: number, // fontSize when <= 2 initials
    fontSizeOver: number, // fontSize when >= 3 initials
    // maxInitials?: number // not yet supported
|}

class Avatar extends Component<Props> {
    render() {
        const { name='', size, fontSize, fontSizeOver } = this.props;

        const initials = getInitials(name);
        const nameColor = hashStringToColor(name);
        const initialsColor = tinycolor.readability(COLOR.white, nameColor) >= 1.3 ? COLOR.white : COLOR.black;

        const avatarStyle = {
            width: size,
            height: size,
            borderRadius: size / 2,
            ...(initials ? { backgroundColor:nameColor } : {})
        }

        const textStyle = {
            fontSize: initials.length <= 2 ? fontSize : fontSizeOver,
            color: initialsColor
        }
        return (
            <View style={[styles.avatar, avatarStyle]}>
                <Text style={textStyle}>
                    { initials || '—' }
                </Text>
            </View>
        )
    }
}

export default Avatar
