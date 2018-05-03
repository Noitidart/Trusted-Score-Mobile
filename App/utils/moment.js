// @flow

import moment from 'moment'

export function formatAgoShort(iso: DateIso) {
    return moment.utc(iso).calendar(null, {
        sameDay: function(now) {
            if (this.isSameOrAfter(now.subtract(44, 'm'))) return `[${this.fromNow(true)}]`.replace('minutes', 'min').replace('a minute', '1 min').replace('a few seconds', 'now');
            else return 'LT';
        },
        lastDay: '[Yesterday] LT',
        lastWeek: 'ddd LT',
        sameElse: function(now) {
            if (this.isSameOrAfter(now.startOf('year'))) return 'MMM D'; // this year
            else return 'll';
        }
    });
}
