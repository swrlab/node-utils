import { intlFormat, type ISODateString, luxonFormat } from './utils.ts'

const luxonDateFormat = 'ccc, d. LLLL yyyy'
/**
 * Get weekday, day, month and year in german locale.
 *
 * @module dates
 *
 * @param date - input Date
 *
 * @returns 'Do, 1. Januar 1970'
 */
export const getDayMonthYearLegacy = (date: ISODateString): string => luxonFormat(date, luxonDateFormat)

const options: Intl.DateTimeFormatOptions = {
	weekday: 'short',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
}
/**
 * Get weekday, day, month and year in german locale.
 *
 * @module dates
 *
 * @param date - input Date
 *
 * @returns 'Do, 1. Januar 1970'
 */
export const getDayMonthYear = (date: ISODateString): string => intlFormat(date, options)
