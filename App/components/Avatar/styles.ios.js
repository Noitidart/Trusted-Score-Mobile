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
        alignItems: 'center',
        overflow: 'hidden'
    },
    avatarText: {
        color: COLOR.white,
        fontWeight: '500',
        textAlign: 'center'
    },
    edit: {
        backgroundColor: COLOR.black,
        position: 'absolute',
        width: '100%',
        paddingTop: 1,
        paddingBottom: 3,
        bottom: 0
    },
    editLabel: {
        color: COLOR.white,
        fontSize: 10,
        textAlign: 'center'
    }
})

export default styles
