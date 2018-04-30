// @flow

import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import moment from 'moment'
import tinycolor from 'tinycolor2'

import COLOR from '../../../config/color'
import { hashStringToColor } from '../../../utils/hash'
import { getInitials } from '../../../utils/forum'

import Icon from '../../../components/Icon'
import MaterialDivider from '../../../components/Material/MaterialDivider'

import styles from './styles'

import type { PopupMenuItem, PopupAnchor } from 'react-native-popup-menu-android'


type Props = {|
    name: string,
    message?: string,
    updatedAt: DateIso,
    score: string | number,
    onPress: OnPress,
    pressPayload: any
|}

type OverflowItem = PopupMenuItem;
type PressKind = 'item' | 'action' | 'primaryAction' | OverflowItem;
type PressPayload = $PropertyType<Props, 'pressPayload'>;
type OnPress = (PressPayload, PressKind, value:? boolean) => void;

class ScoreItem extends Component<Props> {
    render() {
        const { name, score, updatedAt, message } = this.props;

        let initials = getInitials(name);
        const nameColor = hashStringToColor(name);
        const initialsColor = tinycolor.readability(COLOR.white, nameColor) >= 2 ? COLOR.white : COLOR.black;

        return (
            <TouchableNativeFeedback onPress={this.handleItemPress} >
                <View style={styles.scoreItem}>
                    <View style={styles.primaryPosition}>
                        <View style={[styles.primaryIcon, { backgroundColor:nameColor }]}>
                            <Text style={{ fontSize:(initials.length > 2 ? 15 : 20), color:initialsColor }}>
                                { initials }
                            </Text>
                        </View>
                    </View>
                    <View style={styles.lines}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title} numberOfLines={1}>{score}</Text>
                            <Text style={styles.timestampNoColumn}>{updatedAt}</Text>
                        </View>
                        <Text style={styles.subtitle} numberOfLines={1}>
                            {name}
                            { !!message && <Text style={styles.desc}> - {message}</Text> }
                        </Text>
                    </View>
                    <MaterialDivider inset />
                </View>
            </TouchableNativeFeedback>
        )
    }

    handlePress = (kind: PressKind, toggleValue?: boolean) => this.props.onPress(this.props.pressPayload, kind, toggleValue)

    handleItemPress = () => this.handlePress('item')
    handleActionPress = () => this.handlePress('action')
}

export default ScoreItem
