// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../../config/color'

const styles = StyleSheet.create({
    weekForm: {
        padding: 16,
        paddingBottom: 0,
        borderBottomWidth: 1, // from MaterialDivider
        borderBottomColor: 'rgba(0, 0, 0, 0.12)', // from MaterialDivider
        height: 130, // tested onLayout before applying this
        backgroundColor: COLOR.white
    },
    topRow: {
        flexDirection: 'row',
    },
    midCol: {
        flex: 1,
        marginHorizontal: 16
    },
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
        fontSize: 34
    },
    avatarInitialsThree: {
        color: COLOR.white,
        fontSize: 24
    },
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
        color: COLOR.white
    },
    name: {
        flex: 1
    },
    nameInput: {
        fontWeight: '500',
        fontSize: 16,
        color: COLOR.black
    },
    messageInput: {
        fontSize: 16,
        color: COLOR.textColorPrimary
    }
})

export default styles
