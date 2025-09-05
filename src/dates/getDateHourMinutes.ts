import { DateTime } from 'luxon'
import { formatDateString, type ISODateString } from './utils.ts'

const DEFAULT_LOCALE = 'de'

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
	`${DateTime.fromISO(date).setLocale(DEFAULT_LOCALE).toFormat(dayHourMinutesFormat)} Uhr`

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
		timeZone: 'Europe/Berlin',
	}
	return formatDateString(new Intl.DateTimeFormat('de-DE', options).format(Date.parse(date)))
}
