/* eslint-disable func-names */

// load node utils
const { CopyObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

module.exports = async function (sourceUri, destinationUri, keepOriginal) {
	if (sourceUri.substr(0, 5).toLowerCase() === 'gs://' && destinationUri.substr(0, 5).toLowerCase() === 'gs://') {
		// google to google transfer

		// parse source
		const structure = sourceUri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// move file within gcs
		if (keepOriginal !== true) {
			// move is productive/ destructive
			if (this.logger) {
				this.logger.log({
					level: 'info',
					message: `storage.move.gs > ${sourceUri}`,
					source: this.logSource,
					data: { sourceUri, destinationUri, keepOriginal },
				})
			}

			// move file
			const [file] = await this.sdk.gs.bucket(bucket).file(path).move(destinationUri)
			return Promise.resolve(file)
		}

		// mode is dev, only copy file
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.move.gs (only copying) > ${sourceUri}`,
				source: this.logSource,
				data: { sourceUri, destinationUri, keepOriginal },
			})
		}

		// copy file
		const [file] = await this.sdk.gs.bucket(bucket).file(path).copy(destinationUri)
		return Promise.resolve(file)
	}

	if (sourceUri.substr(0, 5).toLowerCase() === 's3://' && destinationUri.substr(0, 5).toLowerCase() === 's3://') {
		// s3 to s3 transfer

		// parse source
		const structure = destinationUri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')
		let deleted

		// always copying
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.move.s3 (copying) > ${sourceUri}`,
				source: this.logSource,
				data: { sourceUri, destinationUri, keepOriginal },
			})
		}

		// copy file
		const moved = await this.sdk.s3.send(
			new CopyObjectCommand({
				Bucket: bucket,
				Key: path,
				CopySource: sourceUri.replace('s3://', '/'),
			})
		)

		// move file within gcs
		if (keepOriginal !== true) {
			// move is productive/ destructive
			if (this.logger) {
				this.logger.log({
					level: 'info',
					message: `storage.move.s3 (deleting source) > ${sourceUri}`,
					source: this.logSource,
					data: { sourceUri, destinationUri, keepOriginal },
				})
			}

			// parse source
			const sourceStructure = sourceUri.substr(5).split('/')
			const sourceBucket = sourceStructure.shift()
			const sourcePath = sourceStructure.join('/')

			// move file
			deleted = await this.sdk.s3.send(
				new DeleteObjectCommand({
					Bucket: sourceBucket,
					Key: sourcePath,
				})
			)
		}

		// return ok
		return Promise.resolve({ moved, deleted })
	}

	// any to any transfer
	if (this.logger) {
		this.logger.log({
			level: 'info',
			message: `storage.move.any > ${sourceUri}`,
			source: this.logSource,
			data: { sourceUri, destinationUri, keepOriginal },
		})
	}

	// download file
	const blob = await this.load(sourceUri)

	// save file to destination
	const moved = await this.save(destinationUri, blob)

	// delete file if in production
	let deleted
	if (keepOriginal !== true) {
		deleted = await this.delete(sourceUri)
	} else if (this.logger) {
		this.logger.log({
			level: 'info',
			message: `storage.move.any (not deleting source) > ${sourceUri}`,
			source: this.logSource,
			data: { sourceUri, destinationUri, keepOriginal },
		})
	}

	// return ok
	return Promise.resolve({ moved, deleted })
}
