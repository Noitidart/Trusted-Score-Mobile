// @flow

import React, { Component } from 'react'
import { Slider, Text, View } from 'react-native'

import Icon from '../../Icon'

import styles from './styles'

import type { FieldProps } from 'redux-form'
import type { IconName, IconSet } from '../../../components/Icon'

type Props = {|
    style?: Style,
    placeholder?: string,
    controlStyle?: Style, // <Style style={controlStyle} />
    onDrag?: (dragValue: number) => void,
    onBaseRef: (name: string, el: *) => void,
    onBaseLayout: () => void,
    ...FieldProps,
    // ...sliderProps - https://facebook.github.io/react-native/docs/textinput.html#props
|}

type State = {|
    dragValue?: number
|}

class FieldSlider extends Component<Props, State> {
    state = {
        dragValue: undefined
    }

    componentDidUpdate(propsPrev: Props, statePrev: State) {
        const {input:{ value }, onDrag } = this.props;
        const { dragValue } = this.state;
        const { dragValue:dragValuePrev } = statePrev;

        if (!this.isFocused && dragValue !== dragValuePrev && dragValue === value) {
            console.log('doing setState');
            this.setState(() => ({ dragValue:undefined }));
        }

        if (onDrag && dragValue !== dragValuePrev) {
            onDrag(dragValue)
        }
    }

    render() {
        const { onBaseLayout, onBaseRef, controlStyle, style, input:{ value, onChange }, meta:{ error, touched }, icon, iconSet, placeholder, ...sliderProps } = this.props;

        return (
            <View style={[styles.field, style]} onLayout={this.handleBaseLayout}>
                <Icon style={styles.icon} name={icon} set={iconSet} />
                <View style={styles.rightCol}>
                    <Text style={[styles.placeholder, { position:'absolute' }]}>
                        { placeholder }
                        { touched && error && <Text style={styles.error}>{error}</Text> }
                    </Text>
                    <Slider onValueChange={this.handleValueChange} onSlidingComplete={this.handleSlidingComplete} style={controlStyle} value={value} {...sliderProps} />
                </View>
            </View>
        )
    }

    isFocused: boolean = false
    updateDragValue(dragValue: number) {
        this.setState(() => {
            const {meta:{ parse }} = this.props; // i dont get access to parse function, have to ask how
            // if (!parse) console.log('no parse, this.props:', this.props);
            const dragValueParsed = parse ? parse(dragValue) : dragValue;
            return { dragValue:dragValueParsed };
        });
    }
    handleValueChange = (dragValue: number) => {
        this.updateDragValue(dragValue);
        if (!this.isFocused) this.handleFocus();
    }
    handleSlidingComplete = (dragValue: number) => {
        const {input:{ onChange }} = this.props;
        this.updateDragValue(dragValue);
        onChange(dragValue);
        this.handleBlur();
    }

    handleFocus = () => {
        const { /* onFocus, */ input } = this.props;
        this.isFocused = true;
        input.onFocus();
        // if (onFocus) onFocus(); // i do not support onFocus as <Slider> doesnt have it, but i can with this custom implementation
    }
    handleBlur = () => {
        const { /* onBlur, */ input } = this.props;
        input.onBlur();
        this.isFocused = false;
        // if (onBlur) onBlur(); // i do not support onBlur as <Slider> doesnt have it, but i can with this custom implementation
    }


    handleBaseLayout = ({nativeEvent:{layout:{ width, height, x, y }}}: LayoutEvent) => {
        const { onBaseLayout, input:{ name } } = this.props;
        if (onBaseLayout) onBaseLayout(name, { width, height, x, y });
    }
}

export default FieldSlider
