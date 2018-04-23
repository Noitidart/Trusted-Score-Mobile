// @flow

// https://medium.com/@lucasurbas/making-android-toolbar-responsive-2627d4e07129
// https://storage.googleapis.com/material-design/publish/material_v_12/assets/0Bzhp5Z4wHba3clVROTBzOU1hMHM/components-dialogs-updates10.png

import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import Button from 'react-native-buttonex'
import showPopupMenu from 'react-native-popup-menu-android'
import { pickBy, lowerFirst } from 'lodash'

import COLOR from '../../../config/color'

import Icon from '../../Icon'

import styles from './styles'

import type { PopupMenuItem } from 'react-native-popup-menu-android'
import type { IconDesc } from '../Icon'

const ID_MORE = '~`~`more~`~`' + Date.now();

type ActionMenuProps = {|
    actionMenuItems: PopupMenuItem[],
    onActionMenuItemPress: (item: PopupMenuItem) => void
|}

type ActionButtonProps = {|
    actionButtonTitle: string,
    // ...buttonexPropsPefexiedWith"actionButton"
|}

type ActionPlainId = string;
type ActionPlainsProps = {|
    actionItems: Array<{
        id: ActionPlainId,
        icon: $PropertyType<IconDesc, 'name'>,
        iconSet?: $PropertyType<IconDesc, 'set'>,
    }>,
    onActionPress: ActionPlainId => void
|}

type ActionProps = {||} | ActionPlainsProps | ActionMenuProps | ActionButtonProps | {|
    ...ActionPlainsProps,
    ...ActionMenuProps
|} | {|
    ...ActionPlainsProps,
    ...ActionButtonProps
|}

type NavItemProps = {||} | {|
    navIcon: $PropertyType<IconDesc, 'name'>,
    navIconSet?: $PropertyType<IconDesc, 'set'>,
    onNavPress: () => void
|}

type Props = {|
    title: string,
    titleSize?: 'normal' | 'appname',
    color?: Color, // short for backgroundColor
    isLightTheme?: boolean, // if background color is light (meaning text will be black).
    ...ActionMenuProps,
    ...NavItemProps
|}

const rippleDarkTheme = TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.2)', true); // https://material.io/guidelines/components/buttons.html#buttons-toggle-buttons
const rippleLightTheme = undefined; // i think default is this: TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.12)', true); // https://material.io/guidelines/components/buttons.html#buttons-toggle-buttons

class MaterialToolbarAction extends Component<{| onRef?:Element=>void, onPress:id=>void, icon:string, iconSet?:string, id:string, isLightTheme?:boolean |}> {
    static defaultProps = {
        titleSize: 'normal',
        iconSet: 'Material'
    }

    render() {
        const { icon, iconSet, onRef } = this.props;

        return (
            <View style={styles.toolbarActionWrap}>
                <TouchableNativeFeedback background={isLightTheme ? rippleLightTheme : rippleDarkTheme} onPress={this.handlePress}>
                    <View style={styles.toolbarActionTouch} ref={onRef}>
                        <Icon style={[styles.toolbarActionIcon, isLightTheme && { color:COLOR.black }]} name={icon} set={iconSet} />
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.toolbarActionGap} />
            </View>
        )
    }

    handlePress = () => {
        const { id, onPress } = this.props;
        onPress(id)
    }
}

class MaterialToolbar extends Component {
    static defaultProps = {
        navIconSet: 'Material'
    }

    more: * = null // TODO:

    render() {
        const { value, color, isLightTheme, actionItems, actionMenuItems, navIcon, titleSize, title, navIconSet, onNavPress, actionButtonTitle } = this.props;

        const hasActionItems = !!actionItems;
        const hasActionMenu = !!actionMenuItems;
        const hasActionButton = !!actionButtonTitle;

        const hasNavItem = !!navIcon;

        let titleStyle;
        if (hasNavItem) {
            if (titleSize === 'appname') titleStyle = styles.titleAppnameWithNav;
            else titleStyle = styles.titleNormalWithNav;
        } else {
            if (titleSize === 'appname') titleStyle = styles.titleAppnameNoNav;
            else titleStyle = styles.titleNormalNoNav;
        }
        if (isLightTheme) titleStyle = [titleStyle, { color:COLOR.black }]

        const actionButtonProps = !hasActionButton ? undefined : Object.entries(this.props).reduce(
            (acc, [key, value]) => {
                if (key.startsWith('actionButton')) {
                    const unprefixedKey = lowerFirst(key.substr('actionButton'.length));
                    Object.assignOne(acc, unprefixedKey, value);
                }
                return acc;
            },
            {}
        );

        return (
            <View style={[styles.toolbar, color && { backgroundColor:color }]}>
                { hasNavItem && (
                    <View style={styles.navItemWrap}>
                        <TouchableNativeFeedback background={rippleDarkTheme} onPress={onNavPress}>
                            <View style={styles.navItemTouch}>
                                <Icon style={[styles.navItemIcon, isLightTheme && { color:COLOR.black }]} name={navIcon} set={navIconSet} />
                            </View>
                        </TouchableNativeFeedback>
                        <View style={styles.toolbarActionGap} />
                    </View>
                )}
                <Text style={titleStyle}>{title}</Text>
                <View style={styles.flex} />
                { hasActionItems && actionItems.map(actionItem => <MaterialToolbarAction key={actionItem.id} {...actionItem} onPress={this.handleActionPress} isLightTheme={isLightTheme} /> ) }
                { hasActionMenu && <MaterialToolbarAction id={ID_MORE} icon="more_vert" onPress={this.handleActionPress} onRef={this.refMore} isLightTheme={isLightTheme} /> }
                { hasActionButton && (
                    <View style={styles.actionButtonWrap}>
                        <Button {...actionButtonProps} lightRipple={!isLightTheme} />
                    </View>
                )}
            </View>
        )
    }

    refMore = el => this.more = el

    handleActionPress = (id: string) => {
        const { onActionPress, actionMenuItems } = this.props;
        console.log('actionMenuItems:', actionMenuItems);
        if (id === ID_MORE) showPopupMenu(actionMenuItems, this.handleActionMenuItemPress, this.more);
        else onActionPress(id);
    }

    handleActionMenuItemPress = (item: PopupMenuItem) => this.props.onActionMenuItemPress(item)

}

export default MaterialToolbar
