/**
 * Checks if the given value is an empty array.
 *
 * @param {unknown} [value] - The value to check.
 * @returns {boolean} `true` if the value is empty, `false` otherwise.
 *
 * @example
 * isEmptyArray() // false
 * isEmptyArray([]) // true
 * isEmptyArray([0]) // false
 */
export const isEmptyArray = (value?: unknown): boolean => Array.isArray(value) && value.length === 0
