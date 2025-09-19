/**
 * Checks if a given value is a plain object.
 * This excludes Arrays and Functions.
 *
 * @module predicate
 *
 * @param {unknown} [value] - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
export const isPlainObject = (value?: unknown): value is Record<PropertyKey, any> =>
	value !== null && typeof value === 'object' && !Array.isArray(value)

// export for legacy name
/**
 * Checks if a given value is an object.
 * This includes arrays and functions but not JS primitives or `null`.
 *
 * @module predicate
 *
 * @param {unknown} [value] - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
export const isObject = (value?: unknown): value is object =>
	value !== null && (typeof value === 'object' || typeof value === 'function')
