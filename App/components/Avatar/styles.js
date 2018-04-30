// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../config/color'

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 32,
        width: 64,
        height: 64,
        backgroundColor: COLOR.grey,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarInitials: {
        color: COLOR.white,
        textAlign: 'center',
        fontSize: 34
    },
    avatarInitialsThree: {
        color: COLOR.white,
        fontSize: 24
    }
})

export default styles
