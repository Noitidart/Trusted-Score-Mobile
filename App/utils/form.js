// @flow

export function formatBlankAsUndefined(value?: string) {
    return value === undefined || value === '' ? undefined : value;
}

export function formatFixedWithoutZeroes(value?: number) {
    // fixes it to 1 decimal place, but if its all 0's at end, it removes it
    if (value === undefined) {
        return undefined;
    } else {
        const fixed = parseFloat(value.toFixed(1));
        const floored = Math.floor(fixed);
        if (fixed - floored < Number.EPSILON) return floored;
        else return fixed;
    }
}
