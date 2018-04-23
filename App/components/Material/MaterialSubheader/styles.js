// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../../config/color'

const styles = StyleSheet.create({
    subheader: {
        paddingHorizontal: 16,
        height: 48,
        justifyContent: 'center'
    },
    subheaderInset: {
        paddingLeft: 72,
        paddingRight: 16,
        height: 48,
        justifyContent: 'center'
    },
    label: {
        fontSize: 14, // https://material.io/guidelines/components/subheaders.html#subheaders-list-subheaders
        color: COLOR.textColorSecondary, // "Subheader color can either be the secondary grey text value (54% black) or the primary color of the app." - https://material.io/guidelines/components/subheaders.html
        fontWeight: '500'
    }
})

export default styles
