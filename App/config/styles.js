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
    },
    formBottomButtonWrap: {
        // alignItems: 'center',
        alignSelf: 'center',
        width: '50%'
    },


    iosTableGroup: {

    },
    iosTableGroupInner: {
        paddingHorizontal: 15,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopColor: COLOR.grey,
        borderBottomColor: COLOR.grey,
        backgroundColor: COLOR.white,
        flexDirection: 'row',
    },
    iosTableLabels: {

    },
    iosTableFields: {
        flex: 1
    },

    iosTableFooter: {
        minHeight: 40,
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    iosTableFooterText: {
        fontSize: 13,
        color: COLOR.grey
    },


    iosTableField: {
        flex: 1,
        height: 43
    },
    iosTableLabels: {
        marginRight: 12
    },
    iosTableLabel: {
        fontSize: 16,
        color: COLOR.black,
        marginRight: 12,
        lineHeight: 43
    },
    iosTableInput: {
        fontSize: 16,
        color: COLOR.black,
        paddingVertical: 12
    }
})

export default STYLES
