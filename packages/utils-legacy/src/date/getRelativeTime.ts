import { type ISODateString, parseDateWithLuxon } from './utils.ts'

/**
 * Get relative years.
 *
 * @module dates
 * @category dates
 *
 * @param date - ISO date string
 *
 * @returns german formatted date string: 'in YY Jahren' or 'vor 12 Tagen'
 */
export const getRelativeTime = (date: ISODateString): string | null => parseDateWithLuxon(date).toRelative()
