/*

	node-storage-wrapper

*/

// load node utils
const undici = require('../../utils/undici')

const loadLocalFile = (that, uri) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.readFile(uri, (err, data) => {
			if (err) reject(err)
			else resolve(data)
		})
	})

module.exports = async function (uri, _logPrefix, options) {
	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		const structure = uri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// load file
		const file = await this.sdk.gs.bucket(bucket).file(path).download()

		// return file
		return Promise.resolve(file[0])
	}

	if (uri.substr(0, 7).toLowerCase() === 'http://' || uri.substr(0, 8).toLowerCase() === 'https://') {
		// public http(s) endpoint
		const file = await undici(uri, {
			timeout: options?.timeout,
			method: 'GET',
			headers: { 'User-Agent': 'node-storage-wrapper' },
		})

		if (file.ok) {
			return Promise.resolve(file.buffer)
		}

		return Promise.reject(new Error(`fetching url failed with status > ${file.statusCode}`))
	}

	// local file
	const file = await loadLocalFile(this, uri)

	// return file
	return Promise.resolve(file)
}
