/* eslint-disable func-names */

// load node utils
const os = require('os')
const pathUtil = require('path')
const { v4: uuidv4 } = require('uuid')
const { PutObjectCommand } = require('@aws-sdk/client-s3')

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

module.exports = async function (uri, buffer, resumable) {
	if (uri.substr(0, 5).toLowerCase() === 's3://') {
		// aws s3 file
		const structure = uri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.save.s3 > ${uri}`,
				source: this.logSource,
				data: { uri },
			})
		}

		// upload to aws
		const saved = await this.sdk.s3.send(
			new PutObjectCommand({
				Bucket: bucket,
				Body: buffer,
				Key: path,
			})
		)

		// return ok
		return Promise.resolve(saved)
	}

	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		const structure = uri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// save to local file
		const tempFilePath = pathUtil.resolve(os.tmpdir(), uuidv4())
		await saveLocalFile(this, tempFilePath, buffer)

		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.save.gs > ${uri}`,
				source: this.logSource,
				data: { uri, resumable },
			})
		}

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
		const [saved] = await this.sdk.gs.bucket(bucket).upload(tempFilePath, bucketConfig)

		// delete local temp file
		await deleteLocalFile(this, tempFilePath)

		// return ok
		return Promise.resolve(saved)
	}

	// local file

	// log progress
	if (this.logger) {
		this.logger.log({
			level: 'info',
			message: `storage.save.local > ${uri}`,
			source: this.logSource,
			data: { uri },
		})
	}

	// save file
	const file = await saveLocalFile(this, uri, buffer)

	// return ok
	return Promise.resolve(file)
}
