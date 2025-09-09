import { isPlainObject } from '../predicate/isObject.ts'
import { getObjectLength } from './getObjectLength.ts'

/**
 * Checks if a given value is an empty object.
 *
 * @module object
 *
 * @param {unknown} [value] - The value to check.
 * @returns {boolean} - `true` if the value is an empty object, `false` otherwise.
 */
export const isEmptyObject = (value?: unknown): boolean => isPlainObject(value) && getObjectLength(value) === 0
