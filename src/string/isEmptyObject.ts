import { getObjectLength } from './getObjectLength.ts'
import { isPlainObject } from './isObject.ts'

/**
 * Checks if a given value is an empty object.
 *
 * @param {unknown} [value] - The value to check.
 * @returns `true` if the value is an empty object, `false` otherwise.
 */
export const isEmptyObject = (value?: unknown): boolean => isPlainObject(value) && getObjectLength(value) === 0
