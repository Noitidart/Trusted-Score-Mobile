// @flow

import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { reduxForm, Field } from 'redux-form'
import wrapDisplayName from 'recompose/wrapDisplayName'

import { deepMapReact } from '../../utils/react'

import FieldText from '../Fields/FieldText'

import styles from './styles'

// goes through and collects all names
// names - should be names of fields in the form, in order as they appear from top to bottom
// this should be composed after reduxForm. so BlahFormed(BlahBaseFormed(BlahDumb))
// goes through and finds non-multiline Field's with FieldText component, and adds to it onSubmitEnding={this.handleReturn}
// and adds onBaseRef={this.handleRef}
// and adds blurOnSubmit={false}
// adds to props, blurFields
// to each field adds onBaseLayout, which on layout, updates fieldPosn with the y value by name
// injects into props focusField(name) // if it has an equivalent in inputRefn, it will scroll the scrollview to the position, then call inputRefn[name].focus()
// wraps in a ScrollView

type Layout = {
    width: number,
    height: number,
    x: number,
    y: number
}

function withBaseFormFactory(reduxFormConfig: {}) {
    return function withBaseForm(WrappedComponent: ComponentType<any>) {
        let names = [];

        let scrollView;
        let submit;

        let scrollViewLayout: Layout;
        let scrollViewX: number = 0;
        let scrollViewY: number = 0;

        const inputRefn = {};
        const fieldPosn = {};

        function handleBaseRef(name: string, el: *) {
            inputRefn[name] = el
        }

        function handleReturn() {
            // when hit "Next" keyboard key focus next field
            // if last field then submit form
            // if nothing focused, then it just submits form
            // NOTE: submit <Button> calls handleReturn in onPress because in case it needs to blur a field (hide the keyboard)
            for (let i=0; i<names.length; i++) {
                const name = names[i];
                if (inputRefn.hasOwnProperty(name) && inputRefn[name].isFocused()) {
                    if (i === names.length - 1) {
                        // last field was focused blur and submit
                        inputRefn[name].blur();
                        submit();
                    } else {
                        // focus next field (it auto blurs currently focused field)
                        const nextName = names[i+1];
                        focusField(nextName);
                    }
                    return;
                }
            }
            // nothing was focused, submit form
            submit();
        }
        function blurFields() {
            for (const name of names) {
                if (inputRefn.hasOwnProperty(name) && inputRefn[name].isFocused()) {
                    inputRefn[name].blur();
                    return;
                }
            }
        }
        function handleBlurSubmit() {
            blurFields();
            submit();
        }
        function focusField(name: string) {
            // scroll to field
            // focus it, if it can be focused
            scrollToField(name);
            if (inputRefn.hasOwnProperty(name)) inputRefn[name].focus();
        }

        function scrollToField(name: string) {
            // aligns bottom of field to bottom of scroll view IF fields bottom is below scrollViewLayout.height
            if (!fieldPosn.hasOwnProperty(name)) return;

            const { y, height } = fieldPosn[name];
            const scrollViewHeight = scrollViewLayout.height;

            const fieldBottomY = y + height;
            if (scrollViewY < fieldBottomY) {
                scrollView.scrollTo({ y:fieldBottomY-scrollViewHeight });
            }
        }

        function handleBaseLayout(name: string, layout: Layout) {
            console.log('handleBaseLayout :: name:', name, 'layout:', layout);
            fieldPosn[name] = layout;
        }


        // return inheritance inversion one
        class WithBaseFormInverted extends WrappedComponent {
            static displayName = wrapDisplayName(WrappedComponent, 'withBaseFormInverted')

            constructor(props) {
                super(props);
                submit = props.submit;
            }

            render() {

                names.length = 0;

                return deepMapReact(super.render(), (element, depth, root) => {
                    if (element.type === Field) {
                        names.push(element.props.name);

                        if (element.props.component === FieldText) {
                            return React.cloneElement(element, { blurOnSubmit:false, onBaseRef:handleBaseRef, onBaseLayout:handleBaseLayout, onSubmitEditing:handleReturn });
                        } else {
                            return React.cloneElement(element, { onBaseLayout:handleBaseLayout });
                        }
                    } else {
                        return element;
                    }
                })

            }
        }

        //
        const Formed = reduxForm(reduxFormConfig)(WithBaseFormInverted);

        // return props proxy
        return class WithBaseForm extends Component {
            static displayName = wrapDisplayName(Formed, 'withBaseForm')

            render() {
                return (
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentView} keyboardShouldPersistTaps="handled" onLayout={this.handleLayout} onScroll={this.handleScroll} ref={this.refScrollView}>
                        <Formed {...this.props} blurFields={blurFields} focusField={focusField} />
                    </ScrollView>
                )
            }

            refScrollView = el => scrollView = el
            handleLayout = ({nativeEvent:{layout:{ width, height, x, y }}}: LayoutEvent) => {
                scrollViewLayout = { width, height, x, y };
            }
            handleScroll = ({nativeEvent:{contentOffset:{ x, y }}}: ScrollEvent) => {
                scrollViewX = x;
                scrollViewY = y;
                console.log('scrollViewY:', scrollViewY);
            }
        }
    }
}

export default withBaseFormFactory
