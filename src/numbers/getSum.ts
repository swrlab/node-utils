import { roundTo } from './roundTo.js'

/**
 * Get sum of number array.
 * The values are rounded to the 2nd decimal position by default.
 *
 * @param arr - number array
 * @param decimals - default is `2`
 * @returns sum of all elements
 */
export const getSum = (arr: number[], decimals = 2): number => arr.reduce((sum, n) => roundTo(sum + n, decimals), 0)

export const getSumNew = (arr: number[], decimals = 2): number =>
	roundTo(
		arr.reduce((sum, n) => sum + n, 0),
		decimals
	)
