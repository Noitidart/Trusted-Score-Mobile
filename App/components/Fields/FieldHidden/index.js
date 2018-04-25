// @flow

import React, { Component } from 'react'

import type { FieldProps } from 'redux-form'

type Props = {|
    ...FieldProps
|}

class FieldHidden extends Component<Props> {
    render() {
        return null;
    }
}

export default FieldHidden
