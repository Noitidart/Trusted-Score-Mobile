// @flow

import React, { Component } from 'react'
import { Text, TextInput, View } from 'react-native'

import styles from './styles'

import type { FieldProps } from 'redux-form'

type Props = {|
    style?: Style,
    disabled?: boolean,
    inputStyle?: Style, // <TextInput style={inputStyle} />
    onRef: (name: string, el: *) => void,
    ...FieldProps,
    // ...textInputProps - https://facebook.github.io/react-native/docs/textinput.html#props
|}

class FieldText extends Component<Props> {
    render() {
        const { disabled, onRef, inputStyle, style, input:{ value, onChange }, meta:{ error, touched }, ...textInputProps } = this.props;

        return (
            <View style={style}>
                <TextInput onBlur={this.handleBlur} onChangeText={onChange} onFocus={this.handleFocus} onBlur={this.handleBlur} ref={onRef && this.handleRef} style={inputStyle} value={value} editable={!disabled} {...textInputProps} />
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

    handleRef = el => {
        const { onRef, input:{ name } } = this.props;
        if (onRef) onRef(name, el);
    }
}

export default FieldText
