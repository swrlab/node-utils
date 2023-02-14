// get all keys of given json
module.exports = (json) => {
	const keys = []
	for (const key in json) {
		if ({}.hasOwnProperty.call(json, key)) {
			keys.push(key)
		}
	}
	return keys
}
