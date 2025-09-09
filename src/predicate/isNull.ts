/**
 * Checks if the given value is null.
 *
 * @module predicate
 *
 * @param {unknown} value - The value to check.
 * @returns {value is null} - `true`, if the value is null, `false` otherwise.
 */
export const isNull = (value: unknown): value is null => value === null
