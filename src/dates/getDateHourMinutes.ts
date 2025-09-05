import { type ISODateString, parseDate, parseDateWithLuxon } from './utils.ts'

const dayHourMinutesFormat = 'ccc, d. LLLL yyyy - HH:mm'
// const dayHourMinutesFormatDateFNS = 'PPPP - kk:mm'
/**
 * Get a date string with full date including weekday and hours with minutes.
 *
 * @module dates
 * @category dates
 *
 * @returns A string like 'Di, 19. Januar 2038 - 03:14 Uhr'.
 */
export const getDateHourMinutesLegacy = (date: ISODateString) =>
	`${parseDateWithLuxon(date).toFormat(dayHourMinutesFormat)} Uhr`

/**
 * Get a date string with full date including weekday and hours with minutes.
 *
 * @module dates
 * @category dates
 * @param date
 * @returns german formatted date string
 */
export function getDateHourMinutes(date: ISODateString): string {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: false,
		// timeZone: 'Europe/Berlin',
	}
	return new Intl.DateTimeFormat('de-DE', options).format(parseDate(date))
}
