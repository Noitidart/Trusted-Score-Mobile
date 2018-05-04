// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text, View, ActionSheetIOS, Alert, AlertIOS } from 'react-native'
import { connect } from 'react-redux'
import { reduxForm, Field, formValueSelector, startSubmit } from 'redux-form'
import tinycolor from 'tinycolor2'
import { debounce, isEqual } from 'lodash'


import COLOR from '../../../config/color';
import AppNavigator, { AppNavigatorUtils } from '../../../routes/AppNavigator'
import { LoginNavigatorUtils } from '../../../routes/LoginNavigator'
import { formatFixedWithoutZeroes, formatBlankAsUndefined } from '../../../utils/form'
import { submitWeekForm } from '../../../store/session'

import Avatar from '../../../components/Avatar'
import Icon from '../../../components/Icon'
import FieldText from '../../../components/Fields/FieldText'
import FieldHidden from '../../../components/Fields/FieldHidden'
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

const FORM = 'week';

class WeekFormDumb extends Component<Props> {
    scoreEl: null | Element<typeof Score> = null

    componentDidUpdate(propsPrev: Props) {
        const { initialValues, dirty } = this.props;
        const { initialValues:initialValuesPrev } = propsPrev;

        if (!isEqual(initialValues, initialValuesPrev)) {
            console.log('DID INITIALIZED!!!!! dirty:', dirty);
            if (dirty) {
                console.log('yes! some field is dirty, so resubmit');
                this.submitDebounced();
            } else {
                console.log('nothing is dirty, so no need to submit again');
            }
        }
    }

    render() {
        const { nameValue, scoreValue, submitting } = this.props;

        // console.log('WeekFormDumb :: props:', Object.entries(this.props).reduce((acc, [key, value]) => Object.assignOne(acc, key, ['undefined', 'string', 'boolean', 'number', 'object'].includes(typeof value) ? value : typeof value)));

        return (
            <View style={styles.weekForm}>
                <Field name="name" component={FieldHidden} />
                <View style={styles.topRow}>
                    <Avatar name={nameValue} size={64} fontSize={34} fontSizeOver={24} onShowEdit={this.handleShowEdit} canShowEdit />
                    <View style={styles.midCol}>
                        <View style={styles.scoreRow}>
                            <Score ref={this.refScore} defaultValue={scoreValue} />
                            <Field name="score" component={FieldSlider} style={styles.slider} controlStyle={styles.sliderControl} format={formatBlankAsUndefined} onChange={this.submitDebounced} maximumValue={10} minimumValue={0} onDrag={this.handleScoreDrag} parse={formatFixedWithoutZeroes} step={0.1} />
                        </View>
                        <Text style={styles.name}>{nameValue}</Text>
                        <View style={styles.divider} />
                    </View>
                </View>
                <View style={styles.commentRow}>
                    <Text style={styles.commentLabel}>Comment</Text>
                    <Field name="comment" component={FieldText} style={styles.comment} inputStyle={styles.commentInput} onChange={this.submitDebounced} placeholder="optional" underlineColorAndroid="transparent" />
                </View>
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

    handleShowEdit = async () => {
        const options = ['Cancel', 'Take Photo', 'Choose Photo', 'Change Name'];
        const selectedOptionIndex: number = await new Promise(resolve => ActionSheetIOS.showActionSheetWithOptions({ options, cancelButtonIndex: 0 }, resolve));

        switch (selectedOptionIndex) {
            case 1: {
                    Alert.alert('Take Photo', '\nThis feature is not yet supported.');
                break;
            }
            case 2: {
                    Alert.alert('Choose Photo', '\nThis feature is not yet supported.');
                break;
            }
            case 3: {
                    const { nameValue } = this.props;
                    const text: null | string = await new Promise(resolve => AlertIOS.prompt('Change Name', null, [
                        { text:'Cancel', onPress:()=>resolve(null), style:'cancel' },
                        { text:'OK', onPress:resolve },
                    ], 'plain-text', nameValue));
                    if (text && text !== nameValue) {
                        const { change } = this.props;
                        change('name', text); // apparently this doesnt trigger the onChange
                        this.submitDebounced();
                    }
                break;
            }
        }
    }

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
        const {session:{user:{ name, score={} }}} = state;

        const { name:nameValue, score:scoreValue } = formValueSelector(FORM)(state, 'name', 'score');

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

export { FORM }
export default WeekForm
