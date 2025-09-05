/**
 * Reduce array elements to object with count
 *
 * @param array
 * @returns object with elements and their count.
 */
export const arrayToObjectCount = (array: string[]): Record<string, number> =>
	array.reduce((obj: Record<string, number>, name: string) => {
		// eslint-disable-next-line security/detect-object-injection -- this seems safe
		obj[name] = obj[name] ? ++obj[name] : 1
		return obj
	}, {})
