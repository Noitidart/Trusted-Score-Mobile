// @flow

import { Platform, TouchableNativeFeedback } from 'react-native'

const COLOR = {
    // system colors

    black: '#000000',
    white: '#FFFFFF',

    grey: Platform.select({
        android: '#9E9E9E',
        ios: '#8E8E93' // ivo
    }),
    red: Platform.select({
        android: '#E51C23',
        ios: 'rgb(255, 59, 48)'
    }),
    green: Platform.select({
        android: '#4CAF50', // material green is "#4CAF50" but i dont like it, i prefer "#5DDA5B"
        ios: 'rgb(76, 217, 100)'
    }),
    blue: Platform.select({
        android: '#2196F3',
        ios: '#007AFF'
    }),
    orange: Platform.select({
        android: '#FF9800',
        ios: 'rgb(255, 149, 0)'
    }),
    teal: Platform.select({
        android: '#009688'
    }),

    wheelIndicatorLineAndroid: '#838486',
    wheelArrowColorOldAndroid: '#999999', // new android does not have arrows
    wheelIndicatorLineOldAndroid: '#6bc7ef', // blueish
    wheelUnselectedTextAndroid: '#949597', //
    alertTextHeaderOldAndroid: '#31b6e7', // bluish - same for alertLineHeaderOldAndroid (the alert line splitter in header) - color picked on https://i.stack.imgur.com/2A3kx.png // can also be #33b5e5 as picked from - http://3.bp.blogspot.com/-ZSw9rNO49ss/Uankm5b1F7I/AAAAAAAAAl0/OZH2YasvGDI/s1600/date_picker.png
    ripple: Platform.OS === 'android' ? TouchableNativeFeedback.Ripple(undefined, true) : undefined,

    // FROM RESOURCES OF NEW ANDROID PROJECT
    textColorPrimary: Platform.select({
        android: 'rgba(0,0,0,0.87)', // #de000000 // The most prominent text color.
        ios: '#000000'
    }),
    textColorPrimaryDisabled: 'rgba(0,0,0,0.223)', // #39000000
    textColorPrimaryInverse: '#ffffff', // #ffffff // Primary inverse text color, useful for inverted backgrounds.
    textColorPrimaryInverseDisabled: 'rgba(255,255,255,0.298)', // #4cffffff
    // textColorPrimaryActivated: '', // #39000000 // Bright text color for use over activated backgrounds.
    // textColorPrimaryActivatedDisabled: '', // #0f000000
    // textColorPrimaryInverseActivated: '', // #42ffffff
    // textColorPrimaryInverseActivatedDisabled: '', // #13ffffff
    // textColorPrimaryDisableOnly: '', // #000000 // Bright text color. Only differentiates based on the disabled state.
    // textColorPrimaryDisableOnlyDisabled: '', // #42000000
    // textColorPrimaryInverseDisableOnly: '', // #ffffff // Bright inverse text color. Only differentiates based on the disabled state.
    // textColorPrimaryInverseDisableOnlyDisabled: '', // #4cffffff

    textColorSecondary: Platform.select({
        android: 'rgba(0,0,0,0.541)', // #8a000000 // Secondary text color.
        ios: '#000000'
    }),
    textColorSecondaryDisabled: 'rgba(0,0,0,0.137)', // #23000000
    // textColorSecondaryInverse: '', // #b3ffffff // Secondary inverse text color, useful for inverted backgrounds.
    // textColorSecondaryInverseDisabled: '', // #35ffffff
    // textColorSecondaryActivated: 'rgba(0,0,0,0.137)', // #23000000 // Dim text color for use over activated backgrounds.
    // textColorSecondaryActivatedDisabled: 'rgba(0,0,0,0.035)', // #09000000
    // textColorSecondaryInverseActivated: '', // #2effffff
    // textColorSecondaryInverseActivatedDisabled: '', // #0dffffff

    colorButtonNormal: '#d6d7d7', // ?attr/colorButtonNormal => @color/button_material_light => #ffd6d7d7
    colorControlHighlight: 'rgba(0,0,0,0.121)', // ?attr/colorControlHighlight => @color/ripple_material_light => #1f000000
    colorBackground: Platform.select({
        android: '#fafafa', // ?android:attr/colorBackground => @color/background_material_light => @color/material_grey_50 => #fffafafa
        ios: '#efeff4' // color picked from settings page (with initials gradient avatar)
    }),
    colorBackgroundFloating: '#ffffff', //  ?android:attr/colorBackgroundFloating => @color/background_floating_material_light => @color/white => #ffffffff

    colorPrimary: '#3F51B5',
    colorPrimaryDark: '#303F9F',
    colorPrimaryAccent: '#FF4081',

    ///////// MY CUSTOM COLORS
    background: '#F9F9F9'
}

export default COLOR
