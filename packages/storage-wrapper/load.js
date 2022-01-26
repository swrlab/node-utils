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

module.exports = async function (uri, logPrefix, options) {
	const thisLogPrefix = logPrefix ? [logPrefix, '>'] : []
	let structure, bucket, path, file

	if (uri.substr(0, 5).toLowerCase() === 's3://') {
		// aws s3 file
		structure = uri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.load.aws >', uri]))

		// load file
		file = await this.sdk.s3
			.getObject({
				Bucket: bucket,
				Key: path,
			})
			.promise()

		// return file
		return Promise.resolve(file.Body)
	}

	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		structure = uri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.load gcp >', uri]))

		// load file
		file = await this.sdk.gs.bucket(bucket).file(path).download()

		// return file
		return Promise.resolve(file[0])
	}

	if (uri.substr(0, 7).toLowerCase() === 'http://' || uri.substr(0, 8).toLowerCase() === 'https://') {
		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.load.https >', uri]))

		// public http(s) endpoint
		file = await undici(uri, {
			timeout: options?.timeout,
			method: 'GET',
			headers: { 'User-Agent': 'node-storage-wrapper' },
		})

		if (file.ok) {
			return Promise.resolve(file.buffer)
		}

		return Promise.reject(new Error(`fetching url failed with status > ${file.statusCode}`))
	}

	// log progress
	this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.load.local >', uri]))

	// local file
	file = await loadLocalFile(this, uri)

	// return file
	return Promise.resolve(file)
}
