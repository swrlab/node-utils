/**
 * Checks if the given value is an array.
 *
 * @deprecated Use `Array.isArray(value)` instead.
 *
 * @param {any} value - The value to be cheked.
 *
 * @returns {boolean} - `true` if the value is an array, `false` otherwise.
 */
export const isArray = (value?: any): value is any[] => Array.isArray(value)
