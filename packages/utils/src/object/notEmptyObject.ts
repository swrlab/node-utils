import { isPlainObject } from '../predicate/isObject.ts'
import { getObjectLength } from './getObjectLength.ts'

/**
 * Checks if a given value is an object and not empty.
 *
 * @module object
 *
 * @param {unknown} [value] - The value to check.
 * @returns {boolean} - `true` if the value is an non-empty object, `false` otherwise.
 */
export const notEmptyObject = (value: Record<any, any>): boolean => isPlainObject(value) && getObjectLength(value) > 0
