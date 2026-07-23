/**
 * Checks if a string contains a searchTerm.
 *
 * @deprecated Use `string.includes(searchTerm)` instead of `isIncluded(string, searchTerm)`.
 *
 * @param {string} string - The string to search in.
 * @param {string} searchTerm - The sub-string to search in the string.
 * @returns `true` if the string contains the searchTerm, `false` otherwise.
 */
export const isIncluded = (string: string, searchTerm: string): boolean => string.includes(searchTerm)

// Array version:
// export const isIncluded = <T>(array: T[], searchElement: T): boolean => array.includes(searchElement)
