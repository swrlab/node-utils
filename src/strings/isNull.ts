/**
 * Checks if the given value is null.
 *
 * @param value - The value to check.
 * @returns `true`, if the value is null, `false` otherwise.
 */
export const isNull = (value: unknown): value is null => value === null
