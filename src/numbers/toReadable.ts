import { DEFAULT_LOCALE } from '../dates/utils.ts'

/**
 * Return a number in german readable format.
 *
 * @param value - number
 *
 * @returns readable number string
 */
export const toReadable = (value: number): string => value.toLocaleString(DEFAULT_LOCALE)
