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
    name: {
        flex: 1
    },
    nameInput: {
        fontWeight: '500',
        fontSize: 16,
        color: COLOR.black
    },
    commentInput: {
        fontSize: 16,
        color: COLOR.textColorPrimary
        // alignSelf: 'flex-start',
        // minWidth: 160 // needed as placeholder doesnt expand the TextInput
    }
})

export default styles
