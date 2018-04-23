// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../config/color'

const styles = StyleSheet.create({
    base: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    opaque: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: COLOR.background // to hide splash in background - not working when keyboard view pushes it away though
    }
})

export default styles
