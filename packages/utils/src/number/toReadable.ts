// TODO: use date package from workspace
// import { DEFAULT_LOCALE } from '../date/utils.ts'
const DEFAULT_LOCALE = 'de'

/**
 * Converts the given number into a german readable format.
 *
 * @param {number} number - The number to be converted.
 *
 * @returns {string} - Ther readable string.
 */
export const toReadable = (number: number): string => number.toLocaleString(DEFAULT_LOCALE)
