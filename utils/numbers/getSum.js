// get sum from array of values
const roundTo = require('./roundTo')

module.exports = (arr, decimals = 2) =>
	arr.reduce((a, b) => roundTo(a + b, decimals), 0)
