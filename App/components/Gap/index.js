// @flow

import React, { PureComponent } from 'react'
import { View } from 'react-native'

type Props = {
    size?: number, // default 1
    horizontal?: boolean
}

const BASE_GAP = 8;

const Gap = ({ size=1, horizontal }: Props) => <View style={{
    width: horizontal ? size * BASE_GAP : undefined,
    height: !horizontal ? size * BASE_GAP : undefined
}} />

export default Gap
