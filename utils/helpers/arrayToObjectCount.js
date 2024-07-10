// reduce array elements to object with count
module.exports = (array) => {
	return array.reduce((obj, name) => {
		obj[name] = obj[name] ? ++obj[name] : 1
		return obj
	}, {})
}
