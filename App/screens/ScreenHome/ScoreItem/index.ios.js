// @flow

import React, { Component } from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import moment from 'moment'

import COLOR from '../../../config/color'
import { getInitials } from '../../../utils/forum'

import Avatar from '../../../components/Avatar'
import Icon from '../../../components/Icon'

import styles from './styles'

import type { Score } from '../../../store/session'


type Props = {|
    ...Score,
    name: string,
    dividerTop?: boolean,
    dividerBottom?: boolean,
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
        const { name, value, updatedAt, comment, dividerTop, dividerBottom } = this.props;

        return (
            <View style={styles.scoreItem}>
                { dividerTop && <View style={styles.dividerTop} /> }
                <View style={styles.primaryPosition}>
                    <Avatar name={name} size={40} fontSize={20} fontSizeOver={15} />
                </View>
                <View style={styles.lines}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title} numberOfLines={1}>{value === null ? '?' : value}</Text>
                        <Text style={styles.timestampNoColumn}>{updatedAt}</Text>
                    </View>
                    <Text style={styles.subtitle} numberOfLines={1}>
                        {name}
                        { !!comment && <Text style={styles.desc}> - {comment}</Text> }
                    </Text>
                    { !dividerBottom && <View style={styles.dividerInset} /> }
                </View>
                { dividerBottom && <View style={styles.dividerBottom} /> }
            </View>
        )
    }

    handlePress = (kind: PressKind, toggleValue?: boolean) => this.props.onPress(this.props.pressPayload, kind, toggleValue)

    handleItemPress = () => this.handlePress('item')
    handleActionPress = () => this.handlePress('action')
}

export default ScoreItem
