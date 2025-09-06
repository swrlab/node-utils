import { toReadable } from '../number/toReadable.ts'

/**
 * Coverts the given number to a readable value with a description term.
 *
 * @param {number} count - The number to be used.
 * @param {string} singular - The singular term, if the number is 1.
 * @param {string} plural - The plural term, if the number is not 1. Optional. If not provided the singular term is used with an `s` appended.
 * @returns {string} - The pluralized string.
 */
export const pluralize = (count: number, singular: string, plural?: string): string => {
	const term = count === 1 ? singular : (plural ?? `${singular}s`)
	return `${toReadable(count)} ${term}`
}
