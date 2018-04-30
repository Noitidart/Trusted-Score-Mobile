// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import tinycolor from 'tinycolor2'

import COLOR from '../../../config/color';
import AppNavigator, { AppNavigatorUtils } from '../../../routes/AppNavigator'
import { LoginNavigatorUtils } from '../../../routes/LoginNavigator'
import { hashStringToColor } from '../../../utils/hash'
import { getInitials } from '../../../utils/forum'
import { formatFixedWithoutZeroes, formatBlankAsUndefined } from '../../../utils/form'

import Icon from '../../../components/Icon'
import FieldText from '../../../components/Fields/FieldText'
import FieldSlider from '../../../components/Fields/FieldSlider'

import styles from  './styles'
import STYLES from '../../../config/styles'

import type { FormProps } from 'redux-form'
import type { Shape as AppShape } from '../../../store'

type OwnProps = {||}

type ConnectedProps = {|
    ...OwnProps,
    //
    initialValues: {|
        name: string,
        score?: number,
        message: string
    |},
    nameValue: string,
    scoreValue?: number
|}

type Props = {|
    ...ConnectedProps,
    ...FormProps
|}

const FORM = 'my-week';

class WeekFormDumb extends Component<Props> {
    render() {
        const { nameValue, scoreValue } = this.props;

        const name = nameValue;
        const initials = getInitials(name || '');
        const nameColor = hashStringToColor(name || '');
        const initialsColor = tinycolor.readability(COLOR.white, nameColor) >= 2 ? COLOR.white : COLOR.black;

        return (
            <View style={styles.weekForm}>
                <View style={styles.topRow}>
                    <View style={[styles.avatar, !!initials && { backgroundColor:nameColor }]}>
                        <Text style={[initials.length <= 2 ? styles.avatarInitials : styles.avatarInitialsThree, { color:initialsColor } ]}>
                            { initials || '—' }
                        </Text>
                    </View>
                    <View style={styles.midCol}>
                        <Field name="name" component={FieldText} style={styles.name} autoCapitalize="words" autoCorrect={false} placeholder="Your Name" placeholderColor={COLOR.textColorSecondary} inputStyle={styles.nameInput} underlineColorAndroid="transparent" />
                        <Field name="score" component={FieldSlider} style={styles.slider} icon="star" iconSet="Material" maximumValue={10} minimumValue={0} step={0.1} parse={formatFixedWithoutZeroes} format={formatBlankAsUndefined} />
                    </View>
                    <View style={styles.score}>
                        <Text style={styles.scoreText}>
                            { scoreValue === undefined ? '?' : scoreValue }
                        </Text>
                    </View>
                </View>
                <Field name="message" component={FieldText} style={styles.message} inputStyle={styles.messageInput} placeholder="Message (optional)" placeholderColor={COLOR.textColorSecondary} underlineColorAndroid="transparent" />
            </View>
        )
    }
}

const WeekFormFormed = reduxForm({
    form: FORM,
    onSubmit: function(valuen, dispatch) {
        console.log('submitting my-week form');
    }
})

const WeekFormConnected = connect(
    function(state: AppShape) {
        const {session:{ name, message, score }} = state;

        const nameValue = formValueSelector(FORM)(state, 'name');
        const scoreValue = formValueSelector(FORM)(state, 'score');
        console.log('scoreValue:', scoreValue, 'score:', score);
        return {
            initialValues: {
                name,
                message,
                score
            },
            nameValue: nameValue !== undefined ? nameValue : name,
            scoreValue: scoreValue !== undefined ? scoreValue : score
        }
    }
)

const WeekForm = WeekFormConnected(WeekFormFormed(WeekFormDumb))

export default WeekForm
