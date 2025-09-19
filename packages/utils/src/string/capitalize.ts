type Capitalized<T extends string> = T extends `${infer FL}${infer Rest}` ? `${Uppercase<FL>}${Rest}` : T

/**
 * Converts the first character of string to upper case.
 *
 * @template T - Literal type of the string.
 * @param {T} str - The string to be converted to uppercase.
 * @returns {Capitalized<T>} - The capitalized string.
 *
 * @example
 * const result = capitalize('apple') // returns 'Apple'
 * const result = capitalize('Apple') // returns 'Apple'
 * const result2 = capitalize('ABC') // returns 'ABC'
 */
export const capitalize = <T extends string>(str: T): Capitalized<T> =>
	!str ? (str as Capitalized<T>) : ((str.charAt(0).toUpperCase() + str.slice(1)) as Capitalized<T>)
