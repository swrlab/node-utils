import { toReadable } from '../numbers/toReadable.ts'

/**
 * Covert a number to a readable value with a description term.
 *
 * @param {number} count - The number to be used.
 * @param singular - The singular term, if the number is 1.
 * @param plural - The plural term, if the number is not 1. Optional. If not provided the singular term is used with an `s` appended.
 * @returns {string} - The pluralized string.
 */
export const pluralize = (count: number, singular: string, plural?: string): string => {
	const term = count === 1 ? singular : (plural ?? `${singular}s`)
	return `${toReadable(count)} ${term}`
}
