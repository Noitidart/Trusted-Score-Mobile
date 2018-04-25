// @flow

import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'

import styles from './styles'

import type { FieldProps } from 'redux-form'

type Props = {|
    style?: Style,
    disabled?: boolean,
    inputStyle?: Style, // <TextInput style={inputStyle} />
    onBaseRef: (name: string, el: *) => void,
    onBaseLayout: () => void,
    ...FieldProps,
    // ...textInputProps - https://facebook.github.io/react-native/docs/textinput.html#props
|}

class FieldText extends Component<Props> {
    render() {
        const { disabled, onBaseLayout, onBaseRef, inputStyle, style, input:{ value, onChange }, meta:{ error, touched }, ...textInputProps } = this.props;

        return (
            <View style={style} onLayout={this.handleBaseLayout}>
                <TextInput onBlur={this.handleBlur} onChangeText={onChange} onFocus={this.handleFocus} onBlur={this.handleBlur} ref={onBaseRef && this.handleBaseRef} style={inputStyle} value={value} editable={!disabled} {...textInputProps} />
                { touched && error && <Text>{error}</Text> }
            </View>
        )
    }

    handleFocus = () => {
        const { onFocus, input } = this.props;
        input.onFocus();
        if (onFocus) onFocus();
    }
    handleBlur = () => {
        const { onBlur, input } = this.props;
        input.onBlur();
        if (onBlur) onBlur();
    }

    handleBaseRef = el => {
        const { onBaseRef, input:{ name } } = this.props;
        if (onBaseRef) onBaseRef(name, el);
    }
    handleBaseLayout = ({nativeEvent:{layout:{ width, height, x, y }}}: LayoutEvent) => {
        const { onBaseLayout, input:{ name } } = this.props;
        if (onBaseLayout) onBaseLayout(name, { width, height, x, y });
    }
}

export default FieldText
