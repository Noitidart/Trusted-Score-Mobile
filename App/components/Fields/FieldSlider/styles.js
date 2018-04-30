// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../../config/color'

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: COLOR.textColorSecondary,
        fontSize: 24
    },
    placeholder: {
        color: COLOR.textColorSecondary,
        fontSize: 15,
        marginLeft: 20,
        marginBottom: 6
    },
    rightCol: {
        flex: 1
    },
    error: {
        color: COLOR.red
    }
})

export default styles
