import crypto from 'node:crypto'
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @deprecated use the newer version that uses the crypto api.
 *
 * @param min
 * @param max
 *
 * @returns random integer
 */
export const getRandomInRangLegacy = (min: number, max: number): number => {
	// Using Math.round() will give you a non-uniform distribution!
	// eslint-disable-next-line sonarjs/pseudo-random -- here it's ok
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Generate a random integer in range using `crypto.getRandomValues()`.
 *
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 *
 * @returns {number} Random integer in range
 */
export const getRandomInRange = (min: number, max: number): number => {
	const range = max - min + 1
	// const buf = new Uint32Array(1)
	// crypto.getRandomValues(buf)
	const buf = crypto.randomBytes(1)

	const octet: number = buf[0] ?? 1
	// Convert to 0-1 range, then scale to our range
	return Math.floor((octet / (0xffffffff + 1)) * range) + min
}
