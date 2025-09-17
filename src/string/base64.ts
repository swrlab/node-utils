import { Buffer } from 'node:buffer'

/**
 * Encode the given string into it's base64 representation.
 * @param str - The input string encoded in utf-8.
 * @returns - The base64 encoded string.
 */
export const toBase64 = (str: string): string => Buffer.from(str, 'utf-8').toString('base64')

/**
 * Decode the given base64 string.
 * @param str - The base64 encoded string.
 * @returns - The decoded contents of the string in utf-8.
 */
export const parseBase64 = (str: string): string => Buffer.from(str, 'base64').toString('utf-8')
