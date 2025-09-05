import { DateTime } from 'luxon'
import { formatDateString, type ISODateString } from './utils.ts'

const DEFAULT_LOCALE = 'de'

const dateFormat = 'ccc, d. LLLL yyyy'
/**
 * Get weekday, day, month and year in german locale.
 *
 * @category dates
 *
 * @param date - input Date
 * @param locale - defaults to `de`
 *
 * @returns 'Do, 1. Januar 1970'
 */
export const getDayMonthYearLegacy = (date: ISODateString, locale: string = DEFAULT_LOCALE): string =>
	DateTime.fromISO(date).setLocale(locale).toFormat(dateFormat)

const options: Intl.DateTimeFormatOptions = {
	weekday: 'short',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
}
/**
 * Get weekday, day, month and year in german locale.
 *
 * @category dates
 *
 * @param date - input Date
 * @param locale - defaults to `de`
 *
 * @returns 'Do, 1. Januar 1970'
 */
export const getDayMonthYear = (date: ISODateString, locale: string = 'de-DE'): string =>
	formatDateString(new Intl.DateTimeFormat(locale, options).format(Date.parse(date)))
