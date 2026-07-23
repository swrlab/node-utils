/**
 * Sleep or wairt for a given time.
 *
 * @param {number} ms - miliseconds to sleep
 * @returns {Promise<void>} - Sleep Promise.
 */
export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
