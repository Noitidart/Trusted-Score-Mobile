// @flow

import React, { Component } from 'react'
import { View, Text, Slider, TextInput } from 'react-native'
import Button from 'react-native-buttonex'
import tinycolor from 'tinycolor2'

import COLOR from '../../config/color';
import AppNavigator, { AppNavigatorUtils } from '../../routes/AppNavigator'
import { LoginNavigatorUtils } from '../../routes/LoginNavigator'
import { hashStringToColor } from '../../utils/hash'

import Icon from '../../components/Icon'

import styles from  './styles'
import STYLES from '../../config/styles'
import { getInitials } from '../../utils/forum'

type Props = {|
    navigation: {|
        navigate: Navigate
    |}
|}

class ScreenHome extends Component<Props> {
    static navigationOptions = {
        title: 'Home'
    }

    didFocusProbe = this.props.navigation.addListener('didFocus', () => {
        this.didFocusProbe.remove();
        LoginNavigatorUtils.getNavigation().popToTop();
        delete this.didFocusProbe;
    })

    render() {

        const name = 'Noitidart Saab';
        const initials = getInitials(name);
        const nameColor = hashStringToColor(name);
        const initialsColor = tinycolor.readability(COLOR.white, nameColor) >= 2 ? COLOR.white : COLOR.black;

        return (
            // <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={STYLES.screen}>
                    <View style={styles.myWeekForm} onLayout={e => console.log(e.nativeEvent)}>
                        <View style={styles.topRow}>
                            <View style={[styles.avatar, { backgroundColor:nameColor }]}>
                                <Text style={[styles.avatarInitials, { color:initialsColor } ]}>
                                    { initials }
                                </Text>
                            </View>
                            <View style={styles.midCol}>
                                <View style={styles.name}>
                                    <TextInput style={styles.nameInput} autoCapitalize="words" autoCorrect={false} underlineColorAndroid="transparent" value={name} />
                                </View>
                                <View style={styles.slider}>
                                    <Icon style={styles.sliderIcon} name="star" set="Material" />
                                    <Slider style={styles.sliderControl} minimumValue={0} maximumValue={10} step={0.1} />
                                </View>
                            </View>
                            <View style={styles.score}>
                                <Text style={styles.scoreText}>
                                    ?
                                </Text>
                            </View>
                        </View>
                        <View style={styles.desc}>
                            <TextInput style={styles.descInput} placeholder="Message (optional)" placeholderColor={COLOR.textColorSecondary} underlineColorAndroid="transparent" />
                        </View>
                    </View>
                </View>
            // </ScrollView>
        )
    }

    gotoProfile = (id?: AccountId) => AppNavigatorUtils.getNavigation().navigate({ routeName:'profile', key:id, params:{ id } })
    gotoYourProfile = () => this.gotoProfile()
}

export default ScreenHome
