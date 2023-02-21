/* eslint-disable func-names */

module.exports = async function (uri, ttl, logPrefix) {
	const thisLogPrefix = logPrefix ? [logPrefix, '>'] : []

	if (uri.substr(0, 5).toLowerCase() === 's3://') {
		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.createUrl.aws >', uri]))

		return Promise.reject(new Error('not implemented'))
	}

	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		const structure = uri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.createUrl.gcp >', uri]))

		// set config
		const config = {
			action: 'read',
			expires: Date.now() + ttl,
		}

		// create link
		const [url] = await this.sdk.gs.bucket(bucket).file(path).getSignedUrl(config)

		// return link
		return Promise.resolve(url)
	}

	if (uri.substr(0, 7).toLowerCase() === 'http://' || uri.substr(0, 8).toLowerCase() === 'https://') {
		// log progress
		this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.createUrl.https >', uri]))

		// return link
		return Promise.resolve(uri)
	}

	// log progress
	this.sdk.log(this, 'log', thisLogPrefix.concat(['storage.createUrl.local >', uri]))

	return Promise.reject(new Error('not implemented'))
}
