/**
 * @fileoverview Date formatting utilities.
 */

import { getDateHourMinutes } from './getDateHourMinutes.ts'
import { getDayMonthYear } from './getDayMonthYear.ts'
import { addOClock, type ISODateString, shortenWeekday } from './utils.ts'
// import { getFullRelativeTime } from '../../utils/date/getFullRelativeTime'
// import { getHourMinutes } from './utils/date/getHourMinutes'
// import { getIsoRelativeTime } from './utils/date/getIsoRelativeTime'
// import { getRelativeTime } from './utils/date/getRelativeTime'
// import { getYearMonthDay } from './utils/date/getYearMonthDay'
// import { revYearMonthDay } from './utils/date/revYearMonthDay.ts'

export { getDateHourMinutes }
export { getDayMonthYear }

export { getDateHourMinutesLegacy } from './getDateHourMinutes.ts'

/**
 * Legacy date exports to be compatible with the previous format.
 */
export const legacy = {
	getDateHourMinutes(date: ISODateString): string {
		return addOClock(date)
	},
	getDayMonthYear: (date: ISODateString): string => shortenWeekday(getDayMonthYear(date)),
}
