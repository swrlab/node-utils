/**
 * Sleep the given time in ms (async).
 *
 * @param ms - miliseconds to sleep
 */
export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))
