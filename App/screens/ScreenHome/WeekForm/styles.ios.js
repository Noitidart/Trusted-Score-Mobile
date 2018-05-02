// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../../config/color'

const styles = StyleSheet.create({
    weekForm: {
        marginVertical: 40,
        padding: 16,
        paddingBottom: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLOR.grey,
        borderTopColor: COLOR.grey,
        backgroundColor: COLOR.white
    },
    topRow: {
        flexDirection: 'row',
        // backgroundColor: 'skyblue',
        paddingBottom: 8 // link209382
    },
    midCol: {
        flex: 1,
        marginLeft: 16,
        top: 8, // for some reason, paddingTop, marginTop are not making midCol grow in height, so i had to put paddingBottom on topRow and then top on midCol to get this shifted affect // link209382
        // backgroundColor: 'springgreen'
    },
    name: {
        color: COLOR.black,
        fontSize: 16
    },
    comment: {
        flex: 1
    },
    commentInput: {
        fontSize: 16,
        color: COLOR.black,
        paddingVertical: 12,
        // alignSelf: 'flex-start',
        // minWidth: 160 // needed as placeholder doesnt expand the TextInput
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    slider: {
        width: '60%',
        height: '100%'
    },
    sliderControl: {
        position: 'absolute',
        width: '100%',
        top: -19
    },
    divider: {
        backgroundColor: COLOR.grey,
        height: StyleSheet.hairlineWidth,
        position: 'absolute',
        bottom: 0,
        width: '150%' // so it defeats the right side padding of weekForm
    },
    commentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentLabel: {
        fontSize: 16,
        color: COLOR.black,
        marginRight: 12,
        top: StyleSheet.hairlineWidth
    }
})

export default styles
