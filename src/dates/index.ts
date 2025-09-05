/**
 * @fileoverview Date formatting utilities.
 */

import { getDateHourMinutes } from './getDateHourMinutes.ts'
import { getDayMonthYear } from './getDayMonthYear.ts'
import { getFullRelativeTime, getFullRelativeTimeLegacy } from './getFullRelativeTime.ts'
// import { revYearMonthDay } from './utils/date/revYearMonthDay.ts'
import { formatDateTimeString, type ISODateString, shortenWeekday } from './utils.ts'

export { getDateHourMinutesLegacy } from './getDateHourMinutes.ts'
export { getHourMinutes } from './getHourMinutes.ts'
export { getIsoRelativeTime } from './getIsoRelativeTime.ts'
export { getRelativeTime } from './getRelativeTime.ts'

export { getDateHourMinutes }
export { getDayMonthYear }
export { getFullRelativeTime }

export { getYearMonthDay } from './getYearMonthDay.ts'

/**
 * Legacy date exports to be compatible with the previous format.
 */
export const legacy = {
	getDateHourMinutes: (date: ISODateString): string => formatDateTimeString(getDateHourMinutes(date)),
	getDayMonthYear: (date: ISODateString): string => shortenWeekday(getDayMonthYear(date)),
	getFullRelativeTime: (date: ISODateString): string => getFullRelativeTimeLegacy(date),
}
