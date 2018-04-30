// @flow

function djb2(str: string): number {
    // https://stackoverflow.com/a/16533568/1828637
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
    }
    return hash;
}

type HexColor = string;
export function hashStringToColor(str: string): HexColor {
    // https://stackoverflow.com/a/16533568/1828637
    const hash = djb2(str);
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;
    return '#' + r.toString(16).substr(-2).padStart(2, '0') + g.toString(16).substr(-2).padStart(2, '0') + b.toString(16).substr(-2).padStart(2, '0');
}
