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
        paddingBottom: 16,
        width: 296,
        alignSelf: 'center',
        // height: '100%' // i dont want this, i want form sized to content (or fill extra space)
        flexGrow: 1,
        justifyContent: 'center'
    }
})

export default STYLES
