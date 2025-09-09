/**
 * Checks if the given array is an empty array.
 *
 * @module array
 *
 * @param {unknown} [arr] - The array to check.
 * @returns {boolean} - `true` if the arr is empty, `false` otherwise.
 *
 * @example
 * isEmptyArray() // false
 * isEmptyArray([]) // true
 * isEmptyArray([0]) // false
 */
export const isEmptyArray = (arr?: unknown): boolean => Array.isArray(arr) && arr.length === 0
