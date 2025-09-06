import { Buffer } from 'node:buffer'

/**
 * Converts the given string into a hexadecimal string.
 *
 * @param value - The string to be converted.
 * @returns {string} - The hex value of the string.
 */
export const toHex = (value: string): string => Buffer.from(value).toString('hex')
