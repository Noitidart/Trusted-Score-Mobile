// @flow

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    app: {
        // backgroundColor: 'orange',
        // height: '100%'
        flex: 1
    },
    // appContentScrollView: {
    //     // backgroundColor: 'yellow',
    //     // flexGrow: 0, // RCTScrollView gets flexGrow: 1 by default
    //     // height: '100%' // dont need this as its flexGrow: 1 due to RCTScrollView
    // },
    appContentContainer: {
        // backgroundColor: 'steelblue',
        // flexGrow: 0, // its already this, follows yoga defaults
        height: '100%'
    }
})

export default styles
