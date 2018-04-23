// @flow

import './boot'

import React, { Component } from 'react'
import { AppRegistry, ScrollView, StatusBar, View } from 'react-native'
import { Provider } from 'react-redux'
import DialogAndroid from 'react-native-dialogs'

import COLOR from './config/color'
import store from './store'

import AppBackground from './AppBackground'
import AppContent from './AppContent'

import styles from './styles'

// StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor(COLOR.colorPrimaryDark, false);

DialogAndroid.assignDefaults({
    negativeText: 'Cancel'
})

class App extends Component<{||}> {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.app}>
                    <AppBackground />
                    <ScrollView style={styles.appContentView} contentContainerStyle={styles.appContentContainer} keyboardShouldPersistTaps="handled" scrollEnabled={false}>
                        <AppContent />
                    </ScrollView>
                </View>
            </Provider>
        )
    }
}

export default App
