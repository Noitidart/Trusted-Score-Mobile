// @flow

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import type { ImageSource as ImageSourceType } from 'react-native/Libraries/Image/ImageSource'
import type { Styles as StylesType, StyleSheet as StyleSheetTypeType } from 'react-native/Libraries/StyleSheet/StyleSheet'

type ImageSource = ImageSourceType;

type Style = StyleObj;
type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
type FontStyle = 'normal' | 'italic';
type FontSize = number;
type Styles = StylesType;
type StyleSheetType = StyleSheetTypeType;
type Color = string;

type TextProps = {};
type TouchableHighlightProps = {};

type AnimatedValue = *;
type AnimatedCallback = ({ finished:boolean }) => void

type LayoutEvent = { nativeEvent:{ layout:{ width:number, height:number, x:number, y:number } } };
type ImageLoadEvent = { nativeEvent:{ source:{ width:number, height:number } } };
type ScrollEvent = {
    nativeEvent: { // tested on android 6.0/23 for onScroll and onMomentScrollEnd on <ScrollView>
        contentInset: { bottom:number, left:number, right:number, top:number },
        contentOffset: { x:number, y:number },
        contentSize: { height:number, width:number },
        layoutMeasurement: { height:number, width:number },
        responderIgnoreScroll: boolean,
        target: number,
        velocity: { x:number, y:number }
    }
}

// FlatList
type RenderItem = ({ item:any, index:number }) => Element
type ScrollToIndex = ({ animated?:boolean, index:number, viewOffset?:number, viewPosition?:number }) => void // https://github.com/facebook/react-native/blob/master/Libraries/Lists/FlatList.js#L345

// Keyboard listener
type KeyboardDidShowEvent = { // tested on android 6.0/23
    endCoodrinates: {
        height: number,
        screenX: number,
        screenY: number, // float
        width: number
    }
}

type KeyboardDidHideEvent = null;  // tested on android 6.0/23
