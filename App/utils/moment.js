// @flow

import moment from 'moment'

export function formatAgoShort(iso: DateIso) {
    const m = moment.utc(iso).local();
    if (m.isSameOrAfter(moment().subtract(44, 'm'))) {
        return m.fromNow(true)
                .replace('minutes', 'min')
                .replace('a minute', '1 min')
                .replace('a few seconds', 'now');
    } else {
        return m.calendar(null, {
            sameDay: 'LT',
            lastDay: '[Yesterday] LT',
            lastWeek: 'ddd LT',
            sameElse: function(now) {
                if (this.isSameOrAfter(now.startOf('year'))) return 'MMM D'; // this year
                else return 'll';
            }
        });
    }
}
