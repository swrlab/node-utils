/**
 * Performant CRC-64 (ECMA-182) implementation in pure TypeScript without any dependencies.
 * @module string
 */

import { Buffer } from 'node:buffer'

// ECMA polynomial: 0x42F0E1EBA9EA3693
const POLY = 0x42f0e1eba9ea3693n

// 64-bit bit mask: 0xffffffffffffffffn
const MASK64 = (1n << 64n) - 1n

// cache the table for future usage (in this ESM module).
let _table: bigint[] | null = null

/**
 * Compute value for table.
 * @param {bigint} v - The input number as BigInt (accumulator from reduce)
 * @returns {bigint} - output as BigInt
 */
const step = (v: bigint): bigint =>
	// Checks if the MSB of `v` is set.
	(v & (1n << 63n)) !== 0n
		? // If the MSB is `1`, then shift v (like multiploy by 2),
			// XOR the result with CRC polynomial (modulo polynomial op) and throw overflow away.
			((v << 1n) ^ POLY) & MASK64
		: // Otherwise, shift v and throw overflow away.
			(v << 1n) & MASK64

/**
 * Create a CRC-64 lookup table.
 *
 * An longer version of this code creating the table:
 * ```ts
 *	const table: bigint[] = Array.from({ length: 256 })
 *	for (let i = 0; i < 256; i++) {
 *		// for non-reflected CRC: start value is byte << 56
 *		let v = BigInt(i) << 56n
 *		for (let j = 0; j < 8; j++) {
 *			if ((v & (1n << 63n)) !== 0n) {
 *				v = ((v << 1n) ^ POLY) & MASK64
 *			} else {
 *				v = (v << 1n) & MASK64
 *			}
 *		}
 *		table[i] = v
 *	}
 * ````
 *
 * @returns {bigint[]} - An array of 256 BigInts.
 */
const createTable = (): bigint[] =>
	_table ?? (_table = Array.from({ length: 256 }, (_, i) => Array.from({ length: 8 }).reduce(step, BigInt(i) << 56n)))

/**
 * Encode a given UTF-8 string to bytes.
 *
 * @param {string} str - The input string.
 * @returns {Uint8Array} - bytes
 */
const encodeUtf8 = (str: string): Uint8Array =>
	typeof TextEncoder !== 'undefined' ? new TextEncoder().encode(str) : Buffer.from(str, 'utf8')

/**
 * Create a function that updates the CRC-64 state with one byte.
 *
 * @param {bigint[]} table - The precomputed CRC-64 lookup table with 256 entries.
 * @returns - Reducer function
 */
const updateCrc =
	(table: bigint[]): ((crc: bigint, b: number) => bigint) =>
	/**
	 * Update the CRC value with one byte.
	 *
	 * @param {bigint} crc - The current 64-bit CRC value.
	 * @param {number} b - The next byte (0 - 255) of input data.
	 * @returns {bigint} - The updated CRC value.
	 */
	(crc: bigint, b: number): bigint =>
		// Shift current CRC left by 8 bits (a.k.a multiply by 256).
		((crc << 8n) ^
			// XOR with the precomputed table value.
			table[
				Number(
					// Take the top 8 bits of the current CRC.
					((crc >> 56n) ^
						// XOR those tops bits with the new data byte.
						BigInt(b)) &
						// Keep only the lowest 8 bits (mod 256).
						0xffn
				)
			]!) &
		// Mask to ensure the result stays within 64 bits.
		MASK64

/**
 * Compute a CRC-64 (ECMA-182) checksum of a given input bytes.
 *
 * @param {Uint8Array} bytes - The input bytes.
 * @returns {bigint} - The CRC-64 checksum of the bytes.
 */
export const crc64 = (bytes: Uint8Array): bigint => bytes.reduce(updateCrc(createTable()), 0n)

/**
 * Convert the given input number into a 16 character long lowercased hex string.
 * Fills in leading `0` if the hex string is shorter than 16 chars.
 *
 * @param {bigint} n - The input number.
 * @returns {string} - The 16-character lowercase hex representation of the input.
 */
const toHex = (n: bigint): string => n.toString(16).padStart(16, '0').toLowerCase()

/**
 * Compute a CRC-64 (ECMA-182) checksum of the given UTF-8 string
 *
 * (so this is not the ISO or Jose implementation.)
 *
 * @param {string} input - The input string to be checksumed.
 * @returns {string} - The 16-char lowercase hex string of the input.
 */
export const crc64String = (input: string): string => {
	const bytes: Uint8Array = encodeUtf8(input)
	const crc: bigint = crc64(bytes)
	return toHex(crc)
}
