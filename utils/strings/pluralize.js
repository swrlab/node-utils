import { toReadable } from '../../src/numbers/toReadable.ts'

// pluralize value to values or use custom plural
export const pluralize = (count, singular, plural) => {
	const multi = plural ?? `${singular}s`
	return `${toReadable(count)} ${count !== 1 ? multi : singular}`
}
