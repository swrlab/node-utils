import type { ISODateString } from './utils.ts'
import { getRelativeTime } from './getRelativeTime.ts'

/**
 * Get iso date with relative years.
 *
 * @module dates
 *
 * @param date - ISO date string
 *
 * @returns ISO date string with relative time suffix
 */
export const getIsoRelativeTime = (date: ISODateString) => `${date} (${getRelativeTime(date)})`
