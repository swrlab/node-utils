/**
 * Checks if the given value is undefined.
 *
 * @param {unknown} x - The value to check.
 * @returns {x is undefined} `true` if the value is undefined, `false` otherwise.
 *
 * @example
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 * isUndefined("") // false
 * isUndefined(false) // false
 * isUndefined([]) // false
 */
export const isUndefined = (x: any): x is undefined => x === undefined
