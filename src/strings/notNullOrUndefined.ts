import { isNull } from './isNull.ts'
import { isUndefined } from './isUndefined.ts'

/**
 * Checks if a given value is not `null` and not `undefined`.
 *
 * @param {unknown} [value] - The value to check.
 * @returns `true` if the value is neither `null` nor `undefined`, `false otherwise`.
 */
export const notNullOrUndefined = (value?: unknown): boolean => !isNull(value) && !isUndefined(value)
