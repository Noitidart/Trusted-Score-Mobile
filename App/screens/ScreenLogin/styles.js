// @flow

import { StyleSheet, Platform } from 'react-native'

import COLOR from '../../config/color'

const styles = StyleSheet.create({
    registerButtonWrap: {
        // width: '100%',
        alignItems: 'center',
        marginTop: 64,
        // position: 'absolute',
        // bottom: 56
    },
    input: Platform.select({
        ios: {
            backgroundColor: COLOR.white,
            borderColor: COLOR.grey,
            borderRadius: 5,
            borderWidth: StyleSheet.hairlineWidth,
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 8
        }
    })
})

export default styles
