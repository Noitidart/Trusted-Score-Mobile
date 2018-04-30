// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../../config/color'

const styles = StyleSheet.create({
    scoreItem: {
        height: 72, // three line
        flexDirection: 'row',
        alignItems: 'center',

    },
    primaryPosition: {
        paddingLeft: 16,
        width: 72,
        alignItems: 'flex-start'
    },
    primaryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLOR.colorButtonNormal,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lines: {
        flex: 1,
        marginRight: 16
    },
    title: {
        fontSize: 16,
        color: COLOR.textColorPrimary,
        flex: 1,
        fontWeight: '500' // against material design
    },
    timestampNoColumn: {
        color: COLOR.textColorSecondary,
        fontSize: 12,
        alignSelf: 'flex-start'
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subtitle: {
        fontSize: 14,
        color: COLOR.textColorPrimary
    },
    desc: {
        fontSize: 14, // guess as "Three-line list" "Text only" section says secondary text is 14, and then looking in - https://storage.googleapis.com/material-design/publish/material_v_12/assets/0Bzhp5Z4wHba3dXNub0hnVG13blE/components-lists-keylines-three1.png - but it doesnt say if the text in this pic is subtitle or desc. but then looking in colros guide here - https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDdGdhMFBMUV9lVjA/style-typography-styles-11-body3.png - we see three lines here and the subtitle is definitely textColorSecondary // link92877777
        color: COLOR.textColorSecondary
    },
})

export default styles
