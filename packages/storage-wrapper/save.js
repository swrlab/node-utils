/*

	node-storage-wrapper

*/

// load node utils
const os = require('node:os')
const pathUtil = require('node:path')
const { randomUUID } = require('node:crypto')

const saveLocalFile = (that, uri, buffer) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.writeFile(uri, buffer, (err) => {
			if (err) reject(err)
			else resolve()
		})
	})

const deleteLocalFile = (that, filePath) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.unlink(filePath, (err) => {
			if (err) reject(err)
			else resolve()
		})
	})

module.exports = async function (uri, buffer, _logPrefix, resumable) {
	let structure, bucket, path

	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		structure = uri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		// save to local file
		const tempFilePath = pathUtil.resolve(os.tmpdir(), randomUUID())
		await saveLocalFile(this, tempFilePath, buffer)

		// create default bucket config
		const bucketConfig = {
			gzip: false,
			destination: path,
			metadata: {},
		}

		// update bucket config with resumable flag if set
		if (resumable !== undefined && resumable !== null) {
			bucketConfig.resumable = resumable
		}

		// upload file to gcs
		await this.sdk.gs
			.bucket(bucket)
			.upload(tempFilePath, bucketConfig)

		// delete local temp file
		await deleteLocalFile(this, tempFilePath)

		// return ok
		return Promise.resolve()
	}

	// local file

	// save file
	const file = await saveLocalFile(this, uri, buffer)

	// return ok
	return Promise.resolve(file)
}
