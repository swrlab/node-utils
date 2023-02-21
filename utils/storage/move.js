/* eslint-disable func-names */

// load node utils
const { CopyObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

module.exports = async function (sourceUri, destinationUri, keepOriginal, logPrefix) {
	const thisLogPrefix = logPrefix ? [logPrefix, '>'] : []
	let structure, bucket, path

	if (sourceUri.substr(0, 5).toLowerCase() === 'gs://' && destinationUri.substr(0, 5).toLowerCase() === 'gs://') {
		// google to google transfer

		// parse source
		structure = sourceUri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		// move file within gcs
		if (keepOriginal !== true) {
			// move is productive/ destructive
			this.sdk.log(
				this,
				'log',
				thisLogPrefix.concat(['storage.move.gcp2gcp >', sourceUri, destinationUri])
			)

			// move file
			await this.sdk.gs.bucket(bucket).file(path).move(destinationUri)
		} else {
			// mode is dev, only copy file
			this.sdk.log(
				this,
				'log',
				thisLogPrefix.concat([
					'storage.move.gcp2gcp (only copying) >',
					sourceUri,
					destinationUri,
				])
			)

			// copy file
			await this.sdk.gs.bucket(bucket).file(path).copy(destinationUri)
		}

		// return ok
		return Promise.resolve()
	}

	if (sourceUri.substr(0, 5).toLowerCase() === 's3://' && destinationUri.substr(0, 5).toLowerCase() === 's3://') {
		// s3 to s3 transfer

		// parse source
		structure = destinationUri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		// always copying
		this.sdk.log(
			this,
			'log',
			thisLogPrefix.concat(['storage.move.aws2aws copying >', sourceUri, destinationUri])
		)

		// copy file
		await this.sdk.s3.send(
			new CopyObjectCommand({
				Bucket: bucket,
				Key: path,
				CopySource: sourceUri.replace('s3://', '/'),
			})
		)

		// move file within gcs
		if (keepOriginal !== true) {
			// move is productive/ destructive
			this.sdk.log(
				this,
				'log',
				thisLogPrefix.concat(['storage.move.aws2aws deleting source >', sourceUri])
			)

			// parse source
			structure = sourceUri.substr(5).split('/')
			bucket = structure.shift()
			path = structure.join('/')

			// move file
			await this.sdk.s3.send(
				new DeleteObjectCommand({
					Bucket: bucket,
					Key: path,
				})
			)
		}

		// return ok
		return Promise.resolve()
	}

	// any to any transfer
	this.sdk.log(
		this,
		'log',
		thisLogPrefix.concat(['storage.move.any2any >', keepOriginal, sourceUri, destinationUri])
	)

	// download file
	const blob = await this.load(sourceUri)

	// save file to destination
	await this.save(destinationUri, blob)

	// delete file if in production
	if (keepOriginal !== true) {
		await this.delete(sourceUri)
	} else {
		this.sdk.log(
			this,
			'log',
			thisLogPrefix.concat(['storage.move.any2any not deleting sourceUri >', keepOriginal, sourceUri])
		)
	}

	// return ok
	return Promise.resolve()
}
