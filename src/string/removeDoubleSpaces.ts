/**
 * Remove all duplicate spaces from the given string.
 *
 * @param string - The string that may contain multiple spaces.
 * @returns {string} - The trimmed string.
 */
export const removeDoubleSpaces = (string: string): string => string.replaceAll(/ +(?= )/g, '')
