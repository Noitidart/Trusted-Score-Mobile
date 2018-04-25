// @flow

import { StyleSheet } from 'react-native'

import COLOR from './color'

const STYLES = StyleSheet.create({
    screen: {
        backgroundColor: COLOR.colorBackground,
        flex: 1
    },

    form: {
        padding: 8,
        width: 296,
        alignSelf: 'center',
        backgroundColor: 'skyblue',
        height: '100%'
    }
})

export default STYLES
