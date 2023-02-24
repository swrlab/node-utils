/* eslint-disable one-var */
/* eslint-disable no-await-in-loop */
/* eslint-disable func-names */

// load node utils
const { ListObjectsV2Command } = require('@aws-sdk/client-s3')

const awsListObjects = async (that, bucket, path, next) => {
	try {
		// load list from aws, pass next token (nullable)
		const files = await that.sdk.s3.send(
			new ListObjectsV2Command({
				Bucket: bucket,
				Prefix: path,
				MaxKeys: 500,
				ContinuationToken: next,
			})
		)

		// return only list and next token
		return Promise.resolve({
			list: files.Contents,
			next: files.IsTruncated ? files.NextContinuationToken : null,
		})
	} catch (err) {
		return Promise.reject(err)
	}
}

const listLocalFiles = (that, uri) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.readdir(uri, 'utf8', (err, data) => {
			if (err) reject(err)
			else resolve(data)
		})
	})

module.exports = async function (uri, max, next) {
	let structure, bucket, path, file

	if (uri.substr(0, 5).toLowerCase() === 's3://') {
		// aws s3 file
		structure = uri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.list.s3 > ${uri}`,
				source: this.logSource,
				data: { uri, max, next },
			})
		}

		// load file
		let maxNotReached = true
		let fileList = []
		let thisNext = next

		do {
			// load data
			const awsReturn = await awsListObjects(this, bucket, path, thisNext || null)

			// add to return list
			fileList = fileList.concat(awsReturn.list)

			// set next token
			thisNext = awsReturn.next

			// calculate max reached
			maxNotReached = !!(max && fileList.length < max)
		} while (thisNext && maxNotReached)

		// return list
		return Promise.resolve({ list: fileList, next: thisNext })
	}

	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		structure = uri.substr(5).split('/')
		bucket = structure.shift()
		path = structure.join('/')

		// log request
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.list.gs > ${uri}`,
				source: this.logSource,
				data: { uri, max, next },
			})
		}

		// load file
		file = await this.sdk.gs.bucket(bucket).getFiles({
			prefix: path,
		})

		// return list
		return Promise.resolve(file[0])
	}

	// log request
	if (this.logger) {
		this.logger.log({
			level: 'info',
			message: `storage.list.local > ${uri}`,
			source: this.logSource,
			data: { uri, max, next },
		})
	}

	// local file
	file = await listLocalFiles(this, uri)

	// return list
	return Promise.resolve(file)
}
