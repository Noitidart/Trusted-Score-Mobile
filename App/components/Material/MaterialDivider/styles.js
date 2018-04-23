// @flow

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    divider: {
        height: 1, // https://material.io/guidelines/components/dividers.html#dividers-specs
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.12)' // light theme https://material.io/guidelines/components/dividers.html#dividers-specs
    },
    inset: {
        left: 72
    },
    dark: {
        backgroundColor: 'rgba(255, 255, 255, 0.12)' // dark theme https://material.io/guidelines/components/dividers.html#dividers-specs
    }
})

export default styles
