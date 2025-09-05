/**
 * Get all keys of given json.
 *
 * @deprecated use `Object.keys` instead
 *
 * @param json
 *
 * @returns array
 */
export const getJsonKeys = (json: any): string[] => {
	const keys = []
	for (const key in json) {
		if (Object.prototype.hasOwnProperty.call(json, key)) {
			keys.push(key)
		}
	}
	return keys
}
