// @flow

import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import tinycolor from 'tinycolor2'

import COLOR from '../../config/color';
import { hashToColor } from '../../utils/hash'
import { getInitials } from '../../utils/forum'
import { findClosestMaterialColor } from '../../utils/color'

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
        const { hex:backgroundColor, light } = findClosestMaterialColor(hashToColor(name.trim()), {
            excludeGroups: ['grey'],
            onlyShades: ['600']
        });

        const avatarStyle = {
            width: size,
            height: size,
            borderRadius: size / 2,
            ...(initials ? { backgroundColor } : {})
        }

        const textStyle = {
            fontSize: initials.length <= 2 ? fontSize : fontSizeOver,
            color: light ? COLOR.white : COLOR.black
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
