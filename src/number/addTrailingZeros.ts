/**
 * Add a given number of trailing zeros to a number.
 *
 * @param {number | string} num - The number to be appended zeros.
 * @param {number} length - The final number length.
 * @param {string} [delimiter] - Number delimeter. Defaults to `.`.
 * @returns {string} - A string of the input number with appended zeros.
 */
export const addTrailingZeros = (num: number | string, length: number, delimiter = '.'): string => {
	// https://bobbyhadz.com/blog/javascript-add-trailing-zeros-to-number
	const string = String(num)
	const splitter = string.includes('.') ? '.' : delimiter
	const parts = string.split(splitter)
	return `${parts[0]}${delimiter}${(parts[1] ?? '').padEnd(length, '0')}`
}
