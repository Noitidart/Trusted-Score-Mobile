// @flow

import { isNotEmail } from 'sane-email-validation'

// rules return a string if error, else undefined

type ErrorMessage = string | void;
type Name = string;
type Valuen = { [Name]:string };

export function testIfBlank(value?: string): ErrorMessage {
    if (!value || !value.trim()) {
        return 'This cannot be blank';
    }
}

export function testIfEmail(value: string): ErrorMessage {
    if (isNotEmail(value)) return 'This is not a valid email'
}

export function testIfSameAs(name: string, nameAs?: string) {
    return function(value: string, valuen: Valuen): ErrorMessage {
        if (value !== valuen[name]) return `This does not match ${nameAs || name}`;
    }
}
