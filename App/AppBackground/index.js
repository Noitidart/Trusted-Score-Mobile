// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import styles from  './styles'

import type { Shape as AppShape } from '../store'
import type { Shape as BackgroundShape } from '../store/background'

type OwnProps = {||}

type Props = {|
    ...OwnProps,
    // ConnectedProps
    ...BackgroundShape
|}

class AppBackgroundDumb extends Component<Props> {

    render() {
        const { color } = this.props;

        let style;
        switch (color) {
            case 'opaque': style = styles.opaque; break;
            case 'transparent': style = styles.base; break;
            default: style = [styles.base, { backgroundColor:color }];
        }

        return <View style={style} />
    }
}

const AppBackgroundConnected = connect(
    function({ background }: AppShape): BackgroundShape {
        return background;
    }
)

const AppBackground = AppBackgroundConnected(AppBackgroundDumb)

export default AppBackground
