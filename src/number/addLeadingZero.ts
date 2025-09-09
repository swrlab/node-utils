/**
 * Add leading zero if not existent.
 *
 * @param {number} value - The number value.
 * @returns {string} - The number as string with a leading zero prepended if needed.
 */
export const addLeadingZero = (value: number): string => value.toString().padStart(2, '0')
