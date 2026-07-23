import { Buffer } from 'node:buffer'

/**
 * Encode the given string into it's base64 representation.
 * @param str - The input string encoded in utf-8.
 * @returns - The base64 encoded string.
 */
const _toBase64Buffer = (str: string): string => Buffer.from(str, 'utf-8').toString('base64')

/**
 * Encode a given UTF-8 string to bytes.
 *
 * @param {string} str - The input string.
 * @returns {Uint8Array} - bytes
 */
export const toBase64 = (str: string): string =>
	// `.toBase64` is only available in browsers (but Buffer is not, since it is Node.js API).
	typeof TextEncoder !== 'undefined' && typeof new Uint8Array().toBase64 !== 'undefined'
		? new TextEncoder().encode(str).toBase64()
		: _toBase64Buffer(str)

/**
 * Decode the given base64 string.
 * @param str - The base64 encoded string.
 * @returns - The decoded contents of the string in utf-8.
 */
export const parseBase64 = (str: string): string => Buffer.from(str, 'base64').toString('utf-8')
