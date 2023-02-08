// add given number of trailing zeros
module.exports = (num, length, delimiter = '.') => {
	// https://bobbyhadz.com/blog/javascript-add-trailing-zeros-to-number
	const string = String(num)
	const splitter = string.includes('.') ? '.' : delimiter
	const parts = String(num).split(splitter)
	return `${parts[0]}${delimiter}${(parts[1] ?? '').padEnd(length, '0')}`
}
