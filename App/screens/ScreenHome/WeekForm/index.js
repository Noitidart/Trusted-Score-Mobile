// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, startSubmit } from 'redux-form'
import tinycolor from 'tinycolor2'
import { debounce } from 'lodash'


import COLOR from '../../../config/color';
import AppNavigator, { AppNavigatorUtils } from '../../../routes/AppNavigator'
import { LoginNavigatorUtils } from '../../../routes/LoginNavigator'
import { hashStringToColor } from '../../../utils/hash'
import { getInitials } from '../../../utils/forum'
import { formatFixedWithoutZeroes, formatBlankAsUndefined } from '../../../utils/form'
import { submitWeekForm } from '../../../store/session'

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

const FORM = 'my-week-wer';

class WeekFormDumb extends Component<Props> {
    scoreEl: null | Element<typeof Score> = null

    componentDidUpdate(propsPrev: Props) {
        const { submitting, dirty } = this.props;
        const { submitting:submittingPrev, dirty:dirtyPrev } = propsPrev;

        if (submitting !== submittingPrev && !submitting) {
            console.log('submitting finished, lets check if anything is dirty, if it is, then resubmit, dirty:', dirty);
            if (dirty) {
                console.log('yes! some field is dirty, so resubmit');
                // this.prepareSubmit();
            } else {
                console.log('nothing is dirty, so no need to submit again');
            }
        }
    }

    render() {
        const { nameValue, scoreValue, submitting } = this.props;

        // console.log('WeekFormDumb :: props:', Object.entries(this.props).reduce((acc, [key, value]) => Object.assignOne(acc, key, ['string', 'boolean', 'number'].includes(typeof value) ? value : typeof value)));

        return (
            <View style={styles.weekForm}>
                <View style={styles.topRow}>
                    <Avatar name={nameValue} size={64} fontSize={34} fontSizeOver={24} />
                    <View style={styles.midCol}>
                        <Field name="name" component={FieldText} style={styles.name} autoCapitalize="words" autoCorrect={false} inputStyle={styles.nameInput} onChange={this.submitDebounced} placeholder="Your Name" placeholderColor={COLOR.textColorSecondary} underlineColorAndroid="transparent" />
                        <Field name="score" component={FieldSlider} style={styles.slider} format={formatBlankAsUndefined} icon="star" iconSet="Material" onChange={this.submitDebounced} maximumValue={10} minimumValue={0}  onDrag={this.handleScoreDrag} parse={formatFixedWithoutZeroes} step={0.1} />
                    </View>
                    <Score ref={this.refScore} defaultValue={scoreValue} />
                </View>
                <Field name="comment" component={FieldText} style={styles.message} inputStyle={styles.messageInput} onChange={this.submitDebounced} placeholder="Comment (optional)" placeholderColor={COLOR.textColorSecondary} underlineColorAndroid="transparent" />
                { submitting && <ActivityIndicator style={{ position:'absolute' }} /> }
            </View>
        )
    }

    refScore = (el: null | Element<typeof Score>) => this.scoreEl = el
    handleScoreDrag = (value: number) => this.scoreEl && this.scoreEl.updateScore(formatFixedWithoutZeroes(value))

    submitDebounced = debounce(() => {
        console.log('submitDebounced :: will hit submit');
        this.props.submit();
    }, 500)

}

const WeekFormFormed = reduxForm({
    form: FORM,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    updateUnregisteredFields: true,
    onSubmit: async function(values, dispatch) {
        console.log('START: submitting my-week form, any tries to make it spin will reject, values:', values);
        await dispatch(submitWeekForm(values)).promise;
        console.log('DONE: my-week form submit done, with values:', values);
    }
})

const WeekFormConnected = connect(
    function(state: AppShape) {
        const {session:{ name, score={} }} = state;

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
