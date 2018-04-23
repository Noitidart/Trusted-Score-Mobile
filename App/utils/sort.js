// @flow

export function byAlphaAsc(a: string, b: string) {
    return a.localeCompare(b);
}

export function byCreatedAtDesc(a: { createdAt:DateIso }, b: { createdAt:DateIso }) {
    return b.createdAt - a.createdAt;
}
