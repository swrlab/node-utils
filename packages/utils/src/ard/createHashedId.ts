import { crc64String } from '../string/crc64.ts'

/**
 * Create a a CRC64-ECMA182-compliant hash from given input.
 *
 * @module ard
 *
 * @param {string} input - The utf-8 encoded input string.
 * @returns {string} - CRC64-ECMA182-compliant hashed input.
 *
 * @example
 * ```
 * // Prints: '6a80b80f748c9b50'
 * ard.createHashedId('my-string-to-encode')
 * ```
 */
export const createHashedId = (input: string): string => crc64String(input)
