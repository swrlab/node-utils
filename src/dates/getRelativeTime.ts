import { type ISODateString, parseDateWithLuxon } from './utils.ts'

/**
 * Get relative years.
 *
 * @param date - ISO date string
 * @returns date string in format 'in YY Jahren' or 'vor 12 Tagen'
 */
export const getRelativeTime = (date: ISODateString): string | null => parseDateWithLuxon(date).toRelative()
