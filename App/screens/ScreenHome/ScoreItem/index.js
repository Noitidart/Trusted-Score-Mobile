// @flow

import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import moment from 'moment'

import COLOR from '../../../config/color'
import { hashStringToColor } from '../../../utils/hash'
import { getInitials } from '../../../utils/forum'
import { formatAgoShort } from '../../../utils/moment'

import Avatar from '../../../components/Avatar'
import Icon from '../../../components/Icon'
import MaterialDivider from '../../../components/Material/MaterialDivider'

import styles from './styles'

import type { PopupMenuItem, PopupAnchor } from 'react-native-popup-menu-android'
import type { Score } from '../../../store/session'


type Props = {|
    ...Score,
    name: string,
    onPress: OnPress,
    pressPayload: {|
        userId: $PropertyType<Score, 'userId'>
    |}
|}

type OverflowItem = PopupMenuItem;
type PressKind = 'item' | 'action' | 'primaryAction' | OverflowItem;
type PressPayload = $PropertyType<Props, 'pressPayload'>;
type OnPress = (PressPayload, PressKind, value:? boolean) => void;

class ScoreItem extends Component<Props> {
    render() {
        const { name, value, updatedAt, comment } = this.props;

        return (
            <TouchableNativeFeedback onPress={this.handleItemPress} disabled>
                <View style={styles.scoreItem}>
                    <View style={styles.primaryPosition}>
                        <Avatar name={name} size={40} fontSize={20} fontSizeOver={15} />
                    </View>
                    <View style={styles.lines}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title} numberOfLines={1}>{value === null ? '?' : value}</Text>
                            <Text style={styles.timestampNoColumn}>{formatAgoShort(updatedAt)}</Text>
                        </View>
                        <Text style={styles.subtitle} numberOfLines={1}>
                            {name}
                            { !!comment && <Text style={styles.desc}> - {comment}</Text> }
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
