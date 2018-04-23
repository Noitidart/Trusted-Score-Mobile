// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../../config/color'

const styles = StyleSheet.create({
    touchTarget: {
        // guess, because - https://material.io/guidelines/layout/metrics-keylines.html#metrics-keylines-sizing-by-increments - says 48 lines up to 9mm. so i did ratio to smallest size (they recommend 7-10mm) and that came out to be 37.3333, i took it to 36 to be in units of 8
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchTargetLarge: {
        // https://material.io/guidelines/layout/metrics-keylines.html#metrics-keylines-sizing-by-increments
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageLarge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        flex: 0,
        resizeMode: 'cover'
    },
    image: {
        width: 20,
        height: 20,
        flex: 0,
        resizeMode: 'cover'
    },
    // imageAsIcon: {
    //     // no border radius
    //     width: 20,
    //     height: 20,
    //     flex: 0,
    //     resizeMode: 'stretch'
    // },
    iconLarge: {
        color: COLOR.textColorPrimary,
        fontSize: 32
    },
    icon: {
        color: COLOR.textColorPrimary,
        fontSize: 22
    },

    circled: {
        // circled is always large
        borderRadius: 24
    }
})

export default styles
