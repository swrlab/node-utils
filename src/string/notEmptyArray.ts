/**
 * Checks if the given value is a non-empty array.
 *
 * @param {unknown[]} [value] - The value to check.
 * @returns `true` if the value is a non-empty array, `false` otherwise.
 */
export const notEmptyArray = (value?: unknown[]): boolean => Array.isArray(value) && value.length > 0
