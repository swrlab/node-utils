// add given number of trailing zeros
export const addTrailingZeros = (num: number | string, length: number, delimiter = '.') => {
	// https://bobbyhadz.com/blog/javascript-add-trailing-zeros-to-number
	const string = String(num)
	const splitter = string.includes('.') ? '.' : delimiter
	const parts = string.split(splitter)
	return `${parts[0]}${delimiter}${(parts[1] ?? '').padEnd(length, '0')}`
}
