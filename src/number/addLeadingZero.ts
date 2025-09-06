/**
 * Add leading zero if not existent.
 *
 * @param value number
 * @returns number string
 */
export const addLeadingZero = (value: number): string => value.toString().padStart(2, '0')
