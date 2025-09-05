import { DEFAULT_LOCALE, type ISODateString, parseDate, parseDateWithLuxon } from './utils.ts'

const luxonDateFormat = 'ccc, d. LLLL yyyy'
/**
 * Get weekday, day, month and year in german locale.
 *
 * @category dates
 *
 * @param date - input Date
 *
 * @returns 'Do, 1. Januar 1970'
 */
export const getDayMonthYearLegacy = (date: ISODateString): string => parseDateWithLuxon(date).toFormat(luxonDateFormat)

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
export const getDayMonthYear = (date: ISODateString, locale: string = DEFAULT_LOCALE): string =>
	new Intl.DateTimeFormat(locale, options).format(parseDate(date))
