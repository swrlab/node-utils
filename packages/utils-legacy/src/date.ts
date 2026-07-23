import { getDateHourMinutes as getDateHourMinutesNew } from './date/getDateHourMinutes.ts'
import { getDayMonthYear as getDayMonthYearNew } from './date/getDayMonthYear.ts'
import { getFullRelativeTimeLegacy } from './date/getFullRelativeTime.ts'
import { getHourMinutes } from './date/getHourMinutes.ts'
import { getIsoRelativeTime } from './date/getIsoRelativeTime.ts'
import { getRelativeTime } from './date/getRelativeTime.ts'
import { getYearMonthDay } from './date/getYearMonthDay.ts'
import { toDayMonthYear as revYearMonthDay } from './date/toDayMonthYear.ts'
import { formatDateTimeString, type ISODateString, shortenWeekday } from './date/utils.ts'

const getDateHourMinutes = (date: ISODateString): string => formatDateTimeString(getDateHourMinutesNew(date))
const getDayMonthYear = (date: ISODateString): string => shortenWeekday(getDayMonthYearNew(date))
const getFullRelativeTime = (date: ISODateString): string => getFullRelativeTimeLegacy(date)

export {
	getDateHourMinutes,
	getDayMonthYear,
	getFullRelativeTime,
	getHourMinutes,
	getIsoRelativeTime,
	getRelativeTime,
	getYearMonthDay,
	revYearMonthDay,
}
