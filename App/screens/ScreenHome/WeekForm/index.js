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

import Avatar from '../../../components/Avatar'
import Icon from '../../../components/Icon'
import FieldText from '../../../components/Fields/FieldText'
import FieldSlider from '../../../components/Fields/FieldSlider'
import Score from './Score'

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
        comment: string
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
    scoreEl: null | Element<typeof Score> = null

    render() {
        const { nameValue, scoreValue } = this.props;

        return (
            <View style={styles.weekForm}>
                <View style={styles.topRow}>
                    <Avatar name={nameValue} size={64} fontSize={34} fontSizeOver={24} />
                    <View style={styles.midCol}>
                        <Field name="name" component={FieldText} style={styles.name} autoCapitalize="words" autoCorrect={false} placeholder="Your Name" placeholderColor={COLOR.textColorSecondary} inputStyle={styles.nameInput} underlineColorAndroid="transparent" />
                        <Field name="score" component={FieldSlider} style={styles.slider} format={formatBlankAsUndefined} icon="star" iconSet="Material" maximumValue={10} minimumValue={0} onDrag={this.handleScoreDrag} parse={formatFixedWithoutZeroes} step={0.1} />
                    </View>
                    <Score ref={this.refScore} defaultValue={scoreValue} />
                </View>
                <Field name="comment" component={FieldText} style={styles.message} inputStyle={styles.messageInput} placeholder="Comment (optional)" placeholderColor={COLOR.textColorSecondary} underlineColorAndroid="transparent" />
            </View>
        )
    }

    refScore = (el: null | Element<typeof Score>) => this.scoreEl = el
    handleScoreDrag = (value: number) => this.scoreEl && this.scoreEl.updateScore(formatFixedWithoutZeroes(value))
}

const WeekFormFormed = reduxForm({
    form: FORM,
    onSubmit: function(valuen, dispatch) {
        console.log('submitting my-week form');
    }
})

const WeekFormConnected = connect(
    function(state: AppShape) {
        const {session:{ name, score }} = state;

        const nameValue = formValueSelector(FORM)(state, 'name');
        const scoreValue = formValueSelector(FORM)(state, 'score');

        return {
            initialValues: {
                name,
                comment: score.comment,
                score: score.value
            },
            nameValue: nameValue !== undefined ? nameValue : name,
            scoreValue: scoreValue !== undefined ? scoreValue : score.value
        }
    }
)

const WeekForm = WeekFormConnected(WeekFormFormed(WeekFormDumb))

export default WeekForm
