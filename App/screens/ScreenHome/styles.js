// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../config/color'

const styles = StyleSheet.create({
    empty: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    list: {
        flexGrow: 0
    },
    refreshButtonWrap: {
        marginTop: 16,
        width: 100
    }
})

export default styles
