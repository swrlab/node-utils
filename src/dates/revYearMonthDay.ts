import type { ISODateString } from './utils.ts'

/**
 * Format a YearMonthDay (english) date into DayMonthYear (german).
 *
 * @param date - ISO date string
 *
 * @returns date string in `DDMMYYYY` format.
 */
export const toDayMonthYear = (date: ISODateString): string => {
	const year = date.slice(0, 4)
	const month = date.slice(4, 6)
	const day = date.slice(6, 8)
	return `${day}${month}${year}`
}

/**
 * Get DDMMYYYY from YYYYMMDD.
 *
 * @param date - ISO date string
 *
 * @returns date string in `DDMMYYYY` format.
 */
export const revYearMonthDay: (date: ISODateString) => string = toDayMonthYear
