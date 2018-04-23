// @flow

import { StyleSheet } from 'react-native'

import COLOR from '../../../config/color'

const titleBase = {
    color: COLOR.white,
    fontSize: 18, // react-navigation
    fontWeight: '500', // react-navigation
}

const titleNoNavBase = {
    marginLeft: 24 // guess as its not in guidelines for without icon. but with icon it gets 24
}

const titleWithNavBase = {
    marginLeft: 14 // from flush left, it should be 72 per https://material.io/guidelines/layout/structure.html#structure-app-bar
}

const titleAppNameBase = {
    fontSize: 22
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: COLOR.colorPrimary,
        height: 56, // TODO: if landscape 48 maybe?
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4
    },
    titleAppnameNoNav: {
        ...titleBase,
        ...titleNoNavBase,
        ...titleAppNameBase
    },
    titleAppnameWithNav: {
        ...titleBase,
        ...titleWithNavBase,
        ...titleAppNameBase
    },
    titleNormalNoNav: {
        ...titleBase,
        ...titleNoNavBase
    },
    titleNormalWithNav: {
        ...titleBase,
        ...titleWithNavBase
    },

    navItemWrap: {
        marginLeft: 2,
        padding: 14
    },
    navItemTouch: {
        padding: 2 // based on size of ripple i saw in gmail app
    },
    navItemIcon: {
        color: COLOR.white,
        fontSize: 24
    },

    toolbarActionIcon: {
        color: COLOR.white,
        fontSize: 24,
        // backgroundColor: 'pink'
    },
    toolbarActionGap: {
        width: 1
    },
    toolbarActionTouch: {
        margin: 12,
        // padding: 16,
        // backgroundColor: 'skyblue'
        // height: 48,
        // width: 48,
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    actionButtonWrap: {
        margin: 12
    },

    flex: {
        flex: 1
    }
})

export default styles
