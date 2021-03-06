// @flow

import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { reduxForm, Field } from 'redux-form'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { set, get } from 'lodash'

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

type ExtraConfig = {|
    validateRules?: {
        [fieldName: string]: Array<()=>string|void> // if you supply a reduxFormConfig.validate - errors from validateRules take precedence. so if field "password" failed validateRules, and reduxFormConfig.validate, the message from validateRules will be shown link43089 // as this takes an array of rules, the first rule that gives error message is taken and rest of rules arent checked
    }
|}

function withBaseFormFactory(reduxFormConfig: {} = {}, { validateRules }: ExtraConfig = {}) {
    return function withBaseForm(WrappedComponent: ComponentType<any>) {
        let names = [];

        let scrollView;
        let submit;

        let scrollViewHeight: number = 0;
        let scrollViewWidth: number = 0;
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
                        // inputRefn[name].blur(); // not needed because i should always put blurFields into redux-form onSubmit
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
        function focusField(name: string) {
            // scroll to field
            // focus it, if it can be focused
            scrollToField(name);
            if (inputRefn.hasOwnProperty(name)) inputRefn[name].focus();
        }

        function scrollToField(name: string) {
            // aligns bottom of field to bottom of scroll view IF fields bottom is below scrollViewHeight
            // alignts top of field to top of scroll view IF fields top is above current scrollViewY
            if (!fieldPosn.hasOwnProperty(name)) return;

            const { y, height } = fieldPosn[name];

            const fieldTopY = y;
            const fieldBottomY = y + height;
            // console.log('scrollViewHeight:', scrollViewHeight, 'scrollViewY:', scrollViewY, 'fieldBottomY:', fieldBottomY, 'y:', y, 'height:', height)
            // if (scrollViewY < fieldBottomY) {
            if (fieldTopY < scrollViewY) {
                // console.log('field top is above. fieldTopY:', fieldTopY, 'scrollViewY:', scrollViewY);
                scrollView.scrollTo({ y:fieldTopY });
            } else if (fieldBottomY > scrollViewY + scrollViewHeight) {
                // console.log('fieldBottomY is below:', fieldBottomY, 'scrollViewY + scrollViewHeight:', scrollViewY + scrollViewHeight);
                scrollView.scrollTo({ y:fieldBottomY-scrollViewHeight });
            }
        }

        function handleBaseLayout(name: string, layout: Layout) {
            fieldPosn[name] = layout;
        }

        const reduxFormConfigFinal = { ...reduxFormConfig };

        if (validateRules) {
            function validate(valuen, dispatch, props) {
                const errorn = {};

                const rulesn = validateRules;

                for (const [name, rules] of Object.entries(rulesn)) {
                    const value = get(valuen, name);
                    for (const rule of rules) {
                        const error = rule(value, valuen);
                        set(errorn, name, error);
                        if (error) break;
                    }
                }

                if (reduxFormConfigFinal.hasOwnProperty(validate)) {
                    const extraErrorn = reduxFormConfigFinal.validate(valuen, dispatch, props);
                    if (extraErrorn) Object.assign(errorn, Object.assign(extraErrorn, errorn)); // link43089
                }

                return errorn;
            }

            reduxFormConfigFinal.validate = validate;
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
                            if (element.props.multiline) {
                                return React.cloneElement(element, { onBaseRef:handleBaseRef, onBaseLayout:handleBaseLayout });
                            } else {
                                return React.cloneElement(element, { blurOnSubmit:false, onBaseRef:handleBaseRef, onBaseLayout:handleBaseLayout, onSubmitEditing:handleReturn });
                            }
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
        const Formed = reduxForm(reduxFormConfigFinal)(WithBaseFormInverted);

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
            handleLayout = ({nativeEvent:{layout:{ width, height }}}: LayoutEvent) => {
                scrollViewHeight = height;
                scrollViewWidth = width;
            }
            handleScroll = ({nativeEvent,nativeEvent:{contentOffset:{ x, y }}}: ScrollEvent) => {
                scrollViewX = x;
                scrollViewY = y;
                // console.log('scrollViewY:', scrollViewY);
            }
        }
    }
}

export default withBaseFormFactory
