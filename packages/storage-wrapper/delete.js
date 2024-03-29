/* eslint-disable func-names */
/*

	node-storage-wrapper

*/

const deleteLocalFile = (that, filePath) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.unlink(filePath, (err) => {
			if (err) reject(err)
			else resolve()
		})
	})

module.exports = async function (uri, logPrefix) {
	const thisLogPrefix = logPrefix ? [logPrefix, '>'] : []
	let structure, bucket, path

	if (uri.substr(0, 5).toLowerCase() === 's3://') {
		// aws s3 file
		structure = uri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.delete.s3 >', uri]))

		// delete from aws
		await this.sdk.s3
			.deleteObject({
				Bucket: bucket,
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

		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.delete.gs >', uri]))

		// delete from gcp
		await this.sdk.gs.bucket(bucket).file(path).delete(path)

		// return ok
		return Promise.resolve()
	}

	if (uri.substr(0, 7).toLowerCase() === 'http://' || uri.substr(0, 8).toLowerCase() === 'https://') {
		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.delete.https (not possible) >', uri]))

		// return ok
		return Promise.resolve()
	}

	// log progress
	this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.delete.local >', uri]))

	// delete file
	await deleteLocalFile(this, uri)

	// return ok
	return Promise.resolve()
}
