/**
 * Checks if the given array is a non-empty array.
 *
 * @param {unknown[]} [arr] - The array to check.
 * @returns {boolean} - `true` if the array is a not empty, `false` otherwise.
 */
export const notEmptyArray = (arr?: unknown[]): boolean => Array.isArray(arr) && arr.length > 0
