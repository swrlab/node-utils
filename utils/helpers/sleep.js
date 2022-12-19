// sleep the given time in ms (async)
module.exports = (ms) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}
