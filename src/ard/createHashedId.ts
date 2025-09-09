import { Buffer } from 'node:buffer'
import crc from 'node-crc'

/**
 * Create a a CRC64-ECMA182-compliant hash from given input.
 *
 * @module ard
 * @category ard
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
export const createHashedId = (input: string): string => crc.crc64(Buffer.from(input, 'utf-8')).toString('hex')
