import { getDateHourMinutes } from './getDateHourMinutes.ts'
import { getRelativeTime } from './getRelativeTime.ts'
import { formatDateTimeString, type ISODateString } from './utils.ts'

/**
 * Get full relative time.
 *
 * @param date - ISO date string
 * @returns formatted date string like: 'Do., 1. Januar 1970 um 00:00 (in YY Jahren)'
 */
export const getFullRelativeTime = (date: ISODateString) => `${getDateHourMinutes(date)} (${getRelativeTime(date)})`

/**
 * Get full relative time.
 *
 * @param date - ISO date string
 * @returns formatted date string like: 'Do, 1. Januar 1970 - 00:00 Uhr (in YY Jahren)'
 */
export const getFullRelativeTimeLegacy = (date: ISODateString) =>
	`${formatDateTimeString(getDateHourMinutes(date))} (${getRelativeTime(date)})`
