// @flow

import React, { PureComponent } from 'react'
import { View } from 'react-native'

import styles from './styles'

type Props = {
    size?: 1 | 2 | 3 | 4, // default 1
    horizontal?: boolean
}

const Gap = ({ size=1, horizontal }) => <View style={styles[`size${size}${horizontal ? '_hor' : ''}`]} />

export default Gap
