import { isNull } from './isNull.ts'
import { isUndefined } from './isUndefined.ts'

/**
 * Checks if a given value is neither `null` nor `undefined`.
 *
 * @module predicate
 *
 * @param {unknown} [value] - The value to check.
 * @returns {boolean} - `true` if the value is neither null nor undefined, `false` otherwise.
 */
export const notNullOrUndefined = (value?: unknown): boolean => !isNull(value) && !isUndefined(value)
