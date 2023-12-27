/* eslint-disable func-names */
/*

	node-storage-wrapper

*/

// load node utils
const os = require('os')
const pathUtil = require('path')
const { randomUUID } = require('crypto')

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

module.exports = async function (uri, buffer, logPrefix, resumable) {
	const thisLogPrefix = logPrefix ? [logPrefix, '>'] : []
	let structure, bucket, path

	if (uri.substr(0, 5).toLowerCase() === 's3://') {
		// aws s3 file
		structure = uri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.save.s3 >', uri]))

		// upload to aws
		await this.sdk.s3
			.upload({
				Bucket: bucket,
				Body: buffer,
				Key: path,
			})
			.promise()

		// return ok
		return Promise.resolve()
	}

	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		structure = uri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		// save to local file
		const tempFilePath = pathUtil.resolve(os.tmpdir(), randomUUID())
		await saveLocalFile(this, tempFilePath, buffer)

		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.save.gs >', uri]))

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
		await this.sdk.gs.bucket(bucket).upload(tempFilePath, bucketConfig)

		// delete local temp file
		await deleteLocalFile(this, tempFilePath)

		// return ok
		return Promise.resolve()
	}

	// local file

	// log progress
	this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.save.local >', uri]))

	// save file
	const file = await saveLocalFile(this, uri, buffer)

	// return ok
	return Promise.resolve(file)
}
