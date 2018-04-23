// @flow

import React, { Component } from 'react'
import { CheckBox, Image, Switch, Text, TouchableNativeFeedback, View } from 'react-native'
import showPopupMenu from 'react-native-popup-menu-android'
import tinycolor from 'tinycolor2'
import { isPlainObject } from 'lodash'

import COLOR from '../../../config/color'

import MaterialIconButton from '../MaterialIconButton'
import MaterialDivider from '../MaterialDivider'
import Icon from '../../Icon'

import styles from './styles'

import type { PopupMenuItem, PopupAnchor } from 'react-native-popup-menu-android'
import type { IconDesc } from '../../Icon'


/*
image/icon - never pressable
action - this is short for secondaryAction
primaryAction - takes place of image/icon // if set this, then secondaryAction cannot be set, however image/icon can be set, and it will be on right side, in the place of secondary action
*/

// if 2-line, and has timestamp, cannot have overflowItems or action

type Props = {|
    action: IconName,
    actionColor?: Color, // not colored if has icon and icon is iconColor
    actionSet?: IconSet,
    dense?: boolean,
    divider?: 'full' | 'inset', // only inset if has icon or image or primaryAction // defaults to no divider
    dividerVertical?: boolean, // should only be used for switch in action position it seems
    disabled?: boolean,
    icon: IconName | ImageSource | 'blank', // not pressable. if primaryAction set, it takes place of this and icon never shows. if image is set, then image is put in right side
    iconCircled?: boolean, // forces iconLarge to true
    iconCircledColor?: Color, // this is against material design guidelines. when circled the icon i have always seen it by white. the color only affected background. but i added this
    iconColor?: Color,
    iconLarge?: boolean,
    iconSet?: IconSet,
    image: ImageSource | 'blank', // not pressable // cannot be blank if in secondary position
    onPress: OnPress,
    oneLine: true,
    overflowItems: PopupMenuItem[],
    pressPayload: any,
    pressable?: boolean, // if can press item
    primaryAction: 'checkbox' | 'switch', // must pass onPress if this is set
    title: string, // should not pass Element<typeof Text> but can
    value?: boolean, // if has checkbox or switch
    imageSize?: number // this is against materail guidelines, but if iwant image bigger then 40 use this
|}


type PropsTwoLine = {|
    ...Props,
    oneLine: false,
    twoLine: true,
    subtitle: string,
    timestamp: string,
    desc?: string, // is always inlined
|}

type PropsThreeLine = {|
    ...PropsTwoLine,
    twoLine: false,
    threeLine: true,
    desc: string,
    descInlined?: boolean
|}

type OverflowItem = PopupMenuItem;

type PressKind = 'item' | 'action' | 'primaryAction' | OverflowItem;
type PressPayload = $PropertyType<Props, 'pressPayload'>;
type OnPress = (PressPayload, PressKind, value:? boolean) => void;

type IconName = $PropertyType<IconDesc, 'name'>;
type IconSet = $PropertyType<IconDesc, 'set'>;

class MaterialListItem extends Component<Props> {
    more: null | PopupAnchor

    render() {
        let {
            action,
            actionColor,
            actionSet,
            dense,
            divider,
            dividerVertical,
            disabled,
            icon,
            iconCircled,
            iconCircledColor,
            iconColor,
            iconLarge,
            iconSet,
            image,
            onPress,
            oneLine,
            overflowItems,
            pressPayload,
            pressable,
            primaryAction,
            title,
            value,
            imageSize,

            twoLine,
            threeLine,
            timestamp,
            subtitle,
            desc,
            descInlined
        } = this.props;

        const hasImage = !!image;
        const hasPrimaryAction = !!primaryAction;
        const hasIcon = !!icon && !hasPrimaryAction; // if has primary action, then icon is not shown
        const hasOverflow = !!overflowItems && !!overflowItems.length;

        let hasAction;
        if (oneLine || twoLine) hasAction = !hasOverflow && !!action; // if has overflow, action will not show
        else if (threeLine) hasAction = !!action; // it can show even if has overflow

        const hasTimestamp = !!timestamp;

        // should obey inset?
        const hasDivider = !!divider;
        if (hasDivider && divider === 'inset') {
            if (!hasPrimaryAction && !hasIcon && !hasImage) divider = 'full'; // override it, to full
        }

        // make action no color?
        if (hasAction) {
            if (hasPrimaryAction || hasImage || (hasIcon && iconColor)) actionColor = undefined; // cannot color secondary action
        }

        let itemStyleName;
        if (oneLine) itemStyleName = 'oneLine';
        if (twoLine) itemStyleName = 'twoLine';
        if (threeLine) itemStyleName = 'threeLine';

        if (dense) itemStyleName += 'Dense';

        const itemStyle = styles[itemStyleName];

        let primaryStyle;
        {
            let primaryContentWidth = 0;
            if (hasPrimaryAction) primaryContentWidth = primaryAction === 'checkbox' ? 20 : 40; // 40 for switch
            else if (hasImage && !hasIcon) primaryContentWidth = imageSize || 40;
            else if (hasIcon) primaryContentWidth = iconCircled ? 40 : 20;

            if (primaryContentWidth) primaryStyle = { paddingLeft:16, width:72+Math.max(0, primaryContentWidth - 40), alignItems:'flex-start' }; // if oversize image, and image is in primary position, then add to 72
            else primaryStyle = { width:16 };
        }


        let secondaryStyle;
        {
            let width = 0;
            if (hasImage && (hasIcon || hasPrimaryAction)) width = imageSize || 40;
            else if (hasAction || hasOverflow) width = 20;

            if (action && action === 'switch') width = 47; // height 27
            if (action && action === 'checkbox') width = 32; // height 32 also

            if (width) secondaryStyle = { width, marginHorizontal:16, alignItems:'center' };
            else secondaryStyle = { width:16 };
        }


        // create elements
        let imageEl;
        if (hasImage) {
            if (image === 'blank') imageEl = null;
            else imageEl = <Image style={{ resizeMode:'cover', height:(imageSize || 40), width:(imageSize || 40), borderRadius:(imageSize ? imageSize / 2 : 20) }} source={image} />;
        }

        let iconEl;
        if (hasIcon) {
            if (icon === 'blank') {
                iconEl = null;
            } else if (typeof icon === 'string') {
                let color = COLOR.textColorSecondary;
                if (iconCircled) color = iconCircledColor || COLOR.white;  // iconCircledColor is against material guidelines
                else if (iconColor) color = iconColor;
                iconEl = <Icon name={icon} set={iconSet} style={{ color, fontSize:(iconLarge || iconCircled ? 28 : 22) }} />;
            } else {
                // assume { uri:string } or number for image asset
                const width = height = iconLarge /* || iconCircled */ ? 37 : 20; // not if iconCircled, its just too big, only if iconLarge - this is against material guidelines - if circled it should always be large. and also should be 40, but i made it 36 here due to trustedfamily looks of the death plus icon slash
                // console.log('iconColor:', iconColor, 'icon:', icon.uri, 'height:', height, 'width:', width);

                let tintColor;
                if (iconCircled) tintColor = iconCircledColor || COLOR.white; // iconCircledColor is against material guidelines
                else if (iconColor !== undefined) tintColor = iconColor;
                else if (iconColor === undefined) tintColor = COLOR.textColorSecondary; // if iconColor is null, then it wont tint it, and use default coloring

                iconEl = <Image source={icon} style={{ resizeMode:'contain', width, height }} tintColor={tintColor} />;
            }

            if (icon !== 'blank' && iconCircled) {
                iconEl = (
                    <View style={[{ width:40, height:40, borderRadius:20, backgroundColor:(iconColor || COLOR.colorButtonNormal), justifyContent:'center', alignItems:'center' }, iconColor && { backgroundColor:iconColor }]}>
                        { iconEl }
                    </View>
                )
            }
        }

        const titleStyle = styles[`title${dense ? 'Dense' : ''}${disabled ? 'Disabled' : ''}`];
        const subtitleStyle = styles[`subtitle${dense ? 'Dense' : ''}${disabled ? 'Disabled' : ''}`];
        const descStyle = styles[`desc${dense ? 'Dense' : ''}${disabled ? 'Disabled' : ''}`];

        let primaryContentEl;
        {
            if (hasImage && (!hasIcon && !hasPrimaryAction)) primaryContentEl = imageEl;
            else if (hasPrimaryAction) {
                if (primaryAction === 'checkbox') primaryContentEl = <CheckBox value={value} onValueChange={this.handlePrimaryActionToggle} disabled={disabled} />;
                // else if (primaryAction === 'switch') primaryContentEl = <Switch value={value} disabled={disabled} />; // switch not allowed in primary position
            } else if (hasIcon) primaryContentEl = iconEl;
        }

        let actionEl;
        if (action === 'checkbox') actionEl = <CheckBox value={value} onValueChange={this.handleActionToggle} disabled={disabled} />
        else if (action === 'switch') actionEl = <Switch value={value} onValueChange={this.handleActionToggle} disabled={disabled} onTintColor={actionColor ? (value ? tinycolor(actionColor).desaturate(30).lighten(30).toRgbString() : undefined) : undefined} thumbTintColor={actionColor ? (value ? actionColor : undefined) : undefined} />
        else if (action) actionEl = <MaterialIconButton name={action} set={actionSet} color={actionColor} onPress={this.handleActionPress} disabled={disabled} />

        // TODO: vertical divider if action is checkbox/switch and subtitle is a description instead of setting value

        if (oneLine) {
            return (
                <TouchableNativeFeedback onPress={pressable ? this.handleItemPress : undefined} disabled={!pressable || disabled} >
                    <View style={itemStyle}>
                        <View style={primaryStyle}>
                            { primaryContentEl }
                        </View>
                        <View style={styles.lines}>
                            <Text style={titleStyle} numberOfLines={1}>{title}</Text>
                        </View>
                        <View style={[secondaryStyle, { justifyContent:'center' }]}>
                            { hasOverflow && <MaterialIconButton icon="more_vert" onPress={this.handleOverflowPress} disabled={disabled} ref={this.refMore} /> }
                            { hasAction && actionEl }
                            { hasImage && (hasPrimaryAction || hasIcon) && imageEl }
                        </View>
                        { hasDivider && <MaterialDivider inset={divider === 'inset'} /> }
                    </View>
                </TouchableNativeFeedback>
            )
        } else if (twoLine) {
            // in two line, if has timestamp, it cannot have any secondary content - timestamp is always within title
            if (dividerVertical && action === 'switch') {
                return (
                    <View style={itemStyle}>
                        <TouchableNativeFeedback onPress={pressable ? this.handleItemPress : undefined} disabled={!pressable || disabled} >
                            <View style={styles.itemLeftTouchable}>
                                <View style={primaryStyle}>
                                    { primaryContentEl }
                                </View>
                                <View style={styles.lines}>
                                    <Text style={titleStyle} numberOfLines={1}>
                                        {title}
                                    </Text>
                                    { !!subtitle &&
                                        <Text style={subtitleStyle} numberOfLines={1}>
                                            {subtitle}
                                            { !!desc && <Text style={descStyle}>- {desc}</Text> }
                                        </Text>
                                    }
                                    { !subtitle && !!desc && <Text style={descStyle} numberOfLines={1}>{desc}</Text> }
                                </View>
                                <View style={styles.dividerVertical} />
                            </View>
                        </TouchableNativeFeedback>
                        <View style={secondaryStyle}>
                            { actionEl }
                        </View>
                        { hasDivider && <MaterialDivider inset={divider === 'inset'} /> }
                    </View>
                )
            } else {
                return (
                    <TouchableNativeFeedback onPress={pressable ? this.handleItemPress : undefined} disabled={!pressable || disabled} >
                        <View style={itemStyle}>
                            <View style={primaryStyle}>
                                { primaryContentEl }
                            </View>
                            <View style={styles.lines}>
                                <Text style={titleStyle} numberOfLines={1}>
                                    {title}
                                    { hasTimestamp && <Text style={styles.timestampNoColumn}>{timestamp}</Text> }
                                </Text>
                                { !!subtitle &&
                                    <Text style={subtitleStyle} numberOfLines={1}>
                                        {subtitle}
                                        { !!desc && <Text style={descStyle}>- {desc}</Text> }
                                    </Text>
                                }
                                { !subtitle && !!desc && <Text style={descStyle} numberOfLines={1}>{desc}</Text> }
                            </View>
                            { !hasTimestamp &&
                                <View style={[secondaryStyle, hasOverflow && { transform:[{ translateY:-4 }] }]}>
                                    { hasOverflow && <MaterialIconButton icon="more_vert" onPress={this.handleOverflowPress} disabled={disabled} ref={this.refMore} /> }
                                    { hasAction && actionEl }
                                    { hasImage && (hasPrimaryAction || hasIcon) && imageEl }
                                </View>
                            }
                            { hasDivider && <MaterialDivider inset={divider === 'inset'} /> }
                        </View>
                    </TouchableNativeFeedback>
                )
            }
        } else if (threeLine) {
            // timestamp is within title if no overflow. if overflow then it is columned
            // TODO: make timestamp come from top right, when !hasOverflow and hasAction
            return (
                <TouchableNativeFeedback onPress={pressable ? this.handleItemPress : undefined} disabled={!pressable || disabled} >
                    <View style={itemStyle}>
                        <View style={primaryStyle}>
                            { primaryContentEl }
                        </View>
                        <View style={styles.lines}>
                            <Text style={titleStyle} numberOfLines={1}>{title}</Text>
                            { !!subtitle && (!desc || !descInlined) && <Text style={subtitleStyle} numberOfLines={1}>{subtitle}</Text> }
                            { !!subtitle && !!desc && descInlined &&
                                <Text style={subtitleStyle} numberOfLines={2}>
                                    {subtitle}
                                    <Text style={descStyle}>- {desc}</Text>
                                </Text>
                            }
                            { !subtitle && !!desc && <Text style={descStyle} numberOfLines={2}>{desc}</Text> }
                            { subtitle && !!desc && !descInlined && <Text style={descStyle} numberOfLines={1}>{desc}</Text> }
                        </View>
                        { hasTimestamp && hasOverflow && <Text style={styles.timestamp}>{timestamp}</Text> }
                        { hasTimestamp && !hasOverflow && <Text style={[styles.timestamp, { position:'absolute', right:16 }]}>{timestamp}</Text> }
                        <View style={[secondaryStyle, { justifyContent:'flex-start' }, hasAction && hasOverflow && { justifyContent:'space-between' }, hasAction && hasTimestamp && { justifyContent:'flex-end' }]}>
                            { hasOverflow && <MaterialIconButton icon="more_vert" onPress={this.handleOverflowPress} disabled={disabled} ref={this.refMore} /> }
                            { hasAction && actionEl }
                            { hasImage && (hasPrimaryAction || hasIcon) && imageEl }
                        </View>
                        { hasDivider && <MaterialDivider inset={divider === 'inset'} /> }
                    </View>
                </TouchableNativeFeedback>
            )
        }
    }

    handlePress = (kind: PressKind, toggleValue?: boolean) => this.props.onPress(this.props.pressPayload, kind, toggleValue)

    handleItemPress = () => this.handlePress('item')
    refMore = el => this.more = el
    handleActionPress = () => this.handlePress('action')
    handlePrimaryActionPress = () => this.handlePress('primaryAction')
    handleOverflowPress = () => showPopupMenu(this.props.overflowItems, this.handlePress, this.more)
    handleActionToggle = (value: boolean) => this.handlePress('action', value)
    handlePrimaryActionToggle = (value: boolean) => this.handlePress('primary', value)
}

export type { OnPress, PressKind }
export default MaterialListItem
