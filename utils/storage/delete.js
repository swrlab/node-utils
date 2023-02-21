/* eslint-disable func-names */

// load node utils
const { DeleteObjectCommand } = require('@aws-sdk/client-s3')

const deleteLocalFile = (that, filePath) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.unlink(filePath, (err) => {
			if (err) reject(err)
			else resolve()
		})
	})

module.exports = async function (uri) {
	const structure = uri.substr(5).split('/')
	const bucket = structure.shift()
	const path = structure.join('/')

	if (uri.substr(0, 5).toLowerCase() === 's3://') {
		// aws s3 file

		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.delete.s3 > ${uri}`,
				source: this.logSource,
				data: { uri },
			})
		}

		// delete from aws
		const deleted = await this.sdk.s3.send(
			new DeleteObjectCommand({
				Bucket: bucket,
				Key: path,
			})
		)

		// return ok
		return Promise.resolve(deleted)
	}

	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage

		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.delete.gs > ${uri}`,
				source: this.logSource,
				data: { uri },
			})
		}

		// delete from gcp
		const deleted = await this.sdk.gs.bucket(bucket).file(path).delete(path)

		// return ok
		return Promise.resolve(deleted)
	}

	if (uri.substr(0, 7).toLowerCase() === 'http://' || uri.substr(0, 8).toLowerCase() === 'https://') {
		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.delete.https (not possible) > ${uri}`,
				source: this.logSource,
				data: { uri },
			})
		}

		// return ok
		return Promise.resolve()
	}

	// log progress
	if (this.logger) {
		this.logger.log({
			level: 'info',
			message: `storage.delete.local > ${uri}`,
			source: this.logSource,
			data: { uri },
		})
	}

	// delete file
	await deleteLocalFile(this, uri)

	// return ok
	return Promise.resolve()
}
