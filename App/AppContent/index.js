// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import AppNavigator, { AppNavigatorUtils } from '../routes/AppNavigator'

import styles from './styles'

type Props = {||}

class AppContent extends Component<Props> {
    navigator: null | * = null // TODO:

    constructor(props: Props) {
        super(props);

        AppNavigatorUtils.getNavigation = this.getNavigation;
    }

    render() {
        return (
            <AppNavigator ref={this.refNavigator} />
        )
    }

    refNavigator = el => this.navigator = el
    getNavigation = (): StackNavigation => this.navigator ? this.navigator._navigation : null
}

export default AppContent
