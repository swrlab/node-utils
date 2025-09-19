// https://gist.github.com/djD-REK/068cba3d430cf7abfddfd32a5d7903c3
/**
 *
 * @param number
 * @param decimals - default is `2`
 *
 * @returns rounded number
 */
export const roundTo = (number: number, decimals = 2): number => Number.parseFloat(number.toFixed(decimals))
