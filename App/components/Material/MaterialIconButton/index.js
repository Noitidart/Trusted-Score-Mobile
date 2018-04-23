// @flow

// https://material.io/guidelines/components/buttons.html#buttons-toggle-buttons

import React, { Component } from 'react'
import { Image, Platform, Text, TouchableNativeFeedback, View } from 'react-native'
import tinycolor from 'tinycolor2'

import COLOR from '../../../config/color'

import Icon from '../../Icon'

import styles from './styles'

import type { IconName, IconSet } from '../../Icon'

type ImageProps = {|
    icon: IconName,
    set?: IconSet,
|} | {|
    icon: ImageSource
|}


type BaseProps = {|
    onPress: () => void,
    ...ImageProps,
    disabled?: boolean,
    // loading?: boolean, // not yet supported
|}
type Props = {|
    // Style: default (light theme)
    ...BaseProps,
    color?: 'dark' | 'light' |  Color, // defaults to dark
    theme?: 'light',
    large?: boolean
    // loading turns icon into ActivityIndicator
|} | {|
    // Style: default dark theme
    ...BaseProps,
    color?: 'light' | Color, // defaults to light
    theme: 'dark',
    large?: boolean
    // loading turns icon into ActivityIndicator
|} | {|
    // Style: Circled
    // if icon is icon - on press in, the icon color becomes "color" and circle becomes "light/dark"
    // if icon is image - Ripple on press
    ...BaseProps,
    onPress?: () => void, // onPress is optional in this style only, all other styles require being pressed
    color?: Color, // applys to circle
    // is always large
    // loading gives disabled style, and goes around circle - https://storage.googleapis.com/material-design/publish/material_v_12/assets/0B6Okdz75tqQsdk1oMG9KY2pCcms/components-progressactivity-typesofindicators-circular-wfab-xhdpi-003.mp4
|} | {|
    // Style: Raised
    ...BaseProps,
    raised: true,
    color?: Color
    // is always large
    // loading gives disabled style, and goes around circle - https://storage.googleapis.com/material-design/publish/material_v_12/assets/0B6Okdz75tqQsdk1oMG9KY2pCcms/components-progressactivity-typesofindicators-circular-wfab-xhdpi-003.mp4
|}

class MaterialIconButton extends Component<Props> {
    static defaultProps = {
        set: 'Material'
    }

    render() {
        const { icon, set, color, circled, theme, onPress, raised, disabled } = this.props;

        const isImage = typeof icon !== 'string'

        if (circled) {

            let iconEl;
            if (isImage) {
                iconEl = <Image source={icon} style={styles.imageLarge} />
            } else {
                // TODO: always white?
                iconEl = <Icon name={icon} set={set} style={[styles.iconLarge, { color:COLOR.textColorPrimaryInverse }, disabled && { color:COLOR.textColorPrimaryInverseDisabled }]} />
            }

            let colorStyle;
            if (color) colorStyle = { backgorundColor:color };
            else colorStyle = { backgroundColor:COLOR.colorButtonNormal }; // TODO: guess from color picking website and matching here

            const background = TouchableNativeFeedback.Ripple('rgba(0,0,0,0.12)', true);

            return (
                <TouchableNativeFeedback onPress={onPress} background={background} disabled={disabled}>
                    <View style={[styles.touchTargetLarge, styles.circled, colorStyle]}>
                        { iconEl }
                    </View>
                </TouchableNativeFeedback>
            )

        } else if (raised) {
            // TODO:
        } else {
            // Style: theme
            const { large, icon, theme } = this.props;

            let iconEl;
            if (isImage) {
                iconEl = <Image source={icon} style={large ? styles.imageLarge : styles.image} />
            } else {
                let colorStyle;
                if (color) {
                    colorStyle = { color };
                } else {
                    if (theme === 'dark') {
                        colorStyle = { color:COLOR.white }; // color is light || void
                    } else {
                        if (color === 'light') colorStyle = { color:COLOR.white };
                        else colorStyle = { color:COLOR.textColorPrimary }; // color == dark || void
                    }
                }
                iconEl = <Icon name={icon} set={set} style={[large ? styles.iconLarge : styles.icon, colorStyle]} />
            }

            let background;
            if (Platform.Version >= 21) {
                if (color) {
                    background = TouchableNativeFeedback.Ripple(tinycolor(color).setAlpha(0.26).toRgbString(), true);
                } else {
                    if (theme === 'dark') {
                        background = TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true); // color is light | void
                    } else {
                        if (color === 'light') background = TouchableNativeFeedback.Ripple('rgba(255,255,255,0.3)', true);
                        else background = TouchableNativeFeedback.Ripple('rgba(0,0,0,0.12)', true); // color is dark | void
                    }
                }
            } else {
                background = TouchableNativeFeedback.SelectableBackground();
            }

            return (
                <TouchableNativeFeedback onPress={onPress} background={background} disabled={!onPress}>
                    <View style={large ? styles.touchTargetLarge : styles.touchTarget}>
                        { iconEl }
                    </View>
                </TouchableNativeFeedback>
            )
        }
    }


    handlePress = () => this.props.onPress(this.props)
}

export default MaterialIconButton
