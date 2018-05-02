// @flow

import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import COLOR from '../../config/color';
import { getInitials } from '../../utils/forum'

import styles from  './styles'

type Props = {|
    name?: string,
    size: number,
    fontSize: number, // fontSize when <= 2 initials
    fontSizeOver: number, // fontSize when >= 3 initials
    canShowEdit?: boolean,
    onShowEdit?: () => void
    // maxInitials?: number // not yet supported
|}

class Avatar extends Component<Props> {
    render() {
        const { name='', size, fontSize, fontSizeOver, canShowEdit, onShowEdit } = this.props;

        const initials = getInitials(name);

        const avatarStyle = {
            width: size,
            height: size,
            borderRadius: size / 2
        }

        const textStyle = {
            fontSize: initials.length <= 2 ? fontSize : fontSizeOver
        }
        return (
            <TouchableOpacity onPress={onShowEdit}>
                <LinearGradient style={[styles.avatar, avatarStyle]} colors={['#DFDFDD', '#B7B7BB', '#B7B7BB']}>
                    <Text style={[styles.avatarText, textStyle]}>
                        { initials || '—' }
                    </Text>
                    { canShowEdit &&
                        <View style={styles.edit}>
                            <Text style={styles.editLabel}>EDIT</Text>
                        </View>
                    }
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

export default Avatar
