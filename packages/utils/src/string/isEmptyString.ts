/**
 * Checks if a given string is empty.
 *
 * @param {string} string - The string to check.
 * @returns `true` if the string is empty, `false` otherwise.
 */
export const isEmptyString = (string: string): string is '' => string === ''
