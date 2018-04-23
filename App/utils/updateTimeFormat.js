// @flow

import moment from 'moment'

type Leading12hZero = {
    [token: string]: null | boolean // null if it doesnt include 'h:' or 'hh:', true/false otherwise
}

const leading12hZero = {};
const lowerMeridiemPlaceholder = ' '.repeat(3);
const upperMeridiemPlaceholder = ' '.repeat(6);
export default function updateTimeFormat(to24h: boolean) {
    // to24h - true to set to 24h ELSE false to set to 12h
    const { _abbr, _longDateFormat } = moment.localeData();

    let longDateFormat;
    if (to24h) {
        // set to 24h format
        longDateFormat = Object.entries(_longDateFormat).reduce((formatz, [token, format]) => {
            if (!(token in leading12hZero)) {
                if (format.includes('hh:')) {
                    leading12hZero[token] = true;
                } else {
                    leading12hZero[token] = false;
                }
            }
            formatz[token] = format.replace('hh:', 'HH:').replace('h:', 'HH:').replace('a', `[${lowerMeridiemPlaceholder}]`).replace('A', `[${upperMeridiemPlaceholder}]`);
            return formatz;
        }, {});
    } else {
        // set to 12h format
        longDateFormat = Object.entries(_longDateFormat).reduce((formatz, [token, format]) => {
            const shouldLeadingZero = leading12hZero[token];
            formatz[token] = format.replace('HH:', shouldLeadingZero ? 'hh:' : 'h:').replace('H:', shouldLeadingZero ? 'hh:' : 'h:').replace(`[${lowerMeridiemPlaceholder}]`, 'a').replace(`[${upperMeridiemPlaceholder}]`, 'A');
            return formatz;
        }, {});
    }

    moment.updateLocale(_abbr, { longDateFormat });
}

moment.prototype._formatOriginal = moment.prototype.format;
moment.prototype.format = function(str) {
    return moment.prototype._formatOriginal.call(this, str).replace(lowerMeridiemPlaceholder, '').replace(`${lowerMeridiemPlaceholder} `, '').replace(` ${lowerMeridiemPlaceholder}`, '').replace(upperMeridiemPlaceholder, '').replace(`${upperMeridiemPlaceholder} `, '').replace(` ${upperMeridiemPlaceholder}`, '');
}
