// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../../config/color'

const item = {
    flexDirection: 'row',
    alignItems: 'center'
}

const styles = StyleSheet.create({
    oneLine: {
        height: 48,
        ...item
    },
    twoLine: {
        height: 72,
        ...item
    },
    threeLine: {
        height: 88,
        ...item
    },

    oneLineDense: {
        height: 40,
        ...item
    },
    twoLineDense: {
        height: 60,
        ...item
    },
    threeLineDense: {
        height: 76,
        ...item
    },

    primary: {
        width: 16
    },
    primaryWithAction: {
        paddingLeft: 8, // needs to sum 16 white space. touchTarget 36/20 - 36-20 is 16, however it doesnt look right, so im not using 0 here - no clue why 8 looks right here
        width: 72,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    primaryWithImage: {
        paddingLeft: 8, // needs to sum 16 white space. touchTarget 48/40
        width: 72,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    secondary: {
        width: 16
    },
    secondaryWithAction: {
        // paddingRight: 0, // needs to sum 16 white space. touchTarget 36/20
        width: 52, // 16 + 16 + 20,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    secondaryWithImage: {
        paddingRight: 8, // needs to sum 16 white space. touchTarget 48/40
        width: 72, // 16 + 16 + 40
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    divider: {
        height: 1, // https://material.io/guidelines/components/dividers.html#dividers-specs
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.12)' // light theme https://material.io/guidelines/components/dividers.html#dividers-specs
    },
    dividerInset: {
        height: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.12)', // light theme

        left: 72
    },

    dividerVertical: {
        width: 1,
        position: 'absolute',
        right: 0,
        height: '70%',
        backgroundColor: 'rgba(0, 0, 0, 0.12)' // light theme https://material.io/guidelines/components/dividers.html#dividers-specs
    },

    itemLeftTouchable: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        flex: 1,
        paddingRight: 16
    },

    lines: {
        flex: 1
    },

    title: {
        fontSize: 16,
        color: COLOR.textColorPrimary
    },
    titleDisabled: {
        fontSize: 16,
        color: COLOR.textColorPrimaryDisabled
    },
    titleDense: {
        fontSize: 13,
        color: COLOR.textColorPrimary
    },
    titleDenseDisabled: {
        fontSize: 13,
        color: COLOR.textColorPrimaryDisabled
    },

    subtitle: {
        fontSize: 14,
        color: COLOR.textColorPrimary
    },
    subtitleDisabled: {
        fontSize: 14,
        color: COLOR.textColorPrimaryDisabled
    },
    subtitleDense: {
        fontSize: 13, // guess as list guidelines dont mention so i think default text is 13 link189190371
        color: COLOR.textColorPrimary
    },
    subtitleDenseDisabled: {
        fontSize: 13, // guess link189190371
        color: COLOR.textColorPrimaryDisabled
    },

    desc: {
        fontSize: 14, // guess as "Three-line list" "Text only" section says secondary text is 14, and then looking in - https://storage.googleapis.com/material-design/publish/material_v_12/assets/0Bzhp5Z4wHba3dXNub0hnVG13blE/components-lists-keylines-three1.png - but it doesnt say if the text in this pic is subtitle or desc. but then looking in colros guide here - https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDdGdhMFBMUV9lVjA/style-typography-styles-11-body3.png - we see three lines here and the subtitle is definitely textColorSecondary // link92877777
        color: COLOR.textColorSecondary
    },
    descDisabled: {
        fontSize: 14, // guess link92877777
        color: COLOR.textColorSecondaryDisabled
    },
    descDense: {
        fontSize: 13, // guess link189190371
        color: COLOR.textColorSecondary
    },
    descDenseDisabled: {
        fontSize: 13, // guess link189190371
        color: COLOR.textColorSecondaryDisabled
    },


    timestamp: {
        color: COLOR.textColorSecondary,
        fontSize: 12,
        textAlign: 'center',
        alignSelf: 'flex-start'
    },
    timestampNoColumn: {
        color: COLOR.textColorSecondary,
        fontSize: 12,
        textAlign: 'right',
        alignSelf: 'flex-start'
    },
    titleWithTimestamp: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }







})

export default styles
