// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../../../config/color'

const styles = StyleSheet.create({
    score: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLOR.grey,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreText: {
        fontSize: 18,
        fontWeight: '500',
        color: COLOR.white,
        textAlign: 'center'
    }
})

export default styles
