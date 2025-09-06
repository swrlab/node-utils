import { getSum as sum } from './getSum.ts'
import { roundTo } from './roundTo.ts'

/**
 * Get average from array of values.
 *
 * @param arr
 * @param decimals
 *
 * @returns average value
 */
export const getAverage = (arr: number[], decimals = 2): number => sum(arr, decimals) / arr.length

// The rounding should occur afterwards to reduce the error.
// And ideally, the rounding is done by the caller themself.
export const getAverageNew = (arr: number[], decimals = 2): number =>
	roundTo(arr.reduce((sum, num) => sum + num, 0) / arr.length, decimals)
