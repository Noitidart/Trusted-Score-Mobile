// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../config/color'

const styles = StyleSheet.create({
    form: {
        paddingBottom: 16,
        // height: '100%' // i dont want this, i want form sized to content (or fill extra space)
        flexGrow: 1,
        justifyContent: 'center'
    },
    dividerInset: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLOR.grey,
        position: 'absolute',
        width: '150%'
    }
})

export default styles
