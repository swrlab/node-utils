/* eslint-disable func-names */

module.exports = async function (uri, ttl, options) {
	if (uri.substr(0, 5).toLowerCase() === 's3://') {
		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'warning',
				message: `storage.createUrl.s3 > ${uri}`,
				source: this.logSource,
				data: { uri, ttl },
			})
		}

		return Promise.reject(new Error('not implemented'))
	}

	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		const structure = uri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.createUrl.gs > ${uri}`,
				source: this.logSource,
				data: { uri, ttl },
			})
		}

		// set config
		const config = {
			action: 'read',
			expires: Date.now() + ttl,
			...options,
		}

		// create link
		const [url] = await this.sdk.gs.bucket(bucket).file(path).getSignedUrl(config)

		// return link
		return Promise.resolve(url)
	}

	if (uri.substr(0, 7).toLowerCase() === 'http://' || uri.substr(0, 8).toLowerCase() === 'https://') {
		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'warning',
				message: `storage.createUrl.https > ${uri}`,
				source: this.logSource,
				data: { uri, ttl },
			})
		}

		// return link
		return Promise.resolve(uri)
	}

	// log progress
	if (this.logger) {
		this.logger.log({
			level: 'warning',
			message: `storage.createUrl.local > ${uri}`,
			source: this.logSource,
			data: { uri, ttl },
		})
	}

	return Promise.reject(new Error('not implemented'))
}
