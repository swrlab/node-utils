// import { isArray } from './isArray.ts'
// import { notNullOrUndefined } from './notNullOrUndefined.ts'

/**
 * Checks if a given value is a plain object.
 *
 * @param {unknown} [value] - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
export const isPlainObject = (value?: unknown): value is Record<PropertyKey, any> =>
	value !== null && typeof value === 'object' && !Array.isArray(value)

// export for legacy name
/**
 * Checks if a given value is a (plain) object.
 *
 * @deprecated Use `isPlainObject instead`
 *
 * @param {unknown} [value] - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
export const isObject: (value?: unknown) => value is Record<PropertyKey, any> = isPlainObject
