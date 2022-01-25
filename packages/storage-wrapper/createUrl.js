/*

	node-storage-wrapper

	This module provides easy access to combine bucket + path to unique URIs

*/

module.exports = async function (uri, ttl, logPrefix) {
	logPrefix = logPrefix ? [logPrefix, '>'] : []

	if (uri.substr(0, 5).toLowerCase() == 's3://') {
		// log progress
		this.sdk.log(this, 'log', logPrefix.concat(['storage.createUrl.aws >', uri]))

		return Promise.reject('not implemented')
	}

	if (uri.substr(0, 5).toLowerCase() == 'gs://') {
		// google cloud storage
		let structure = uri.substr(5).split('/')
		let bucket = structure.shift()
		let path = structure.join('/')

		// log progress
		this.sdk.log(this, 'log', logPrefix.concat(['storage.createUrl.gcp >', uri]))

		// set config
		const config = {
			action: 'read',
			expires: Date.now() + ttl,
		}

		// create link
		var [url] = await this.sdk.gs.bucket(bucket).file(path).getSignedUrl(config)

		// return link
		return Promise.resolve(url)
	}

	if (uri.substr(0, 7).toLowerCase() == 'http://' || uri.substr(0, 8).toLowerCase() == 'https://') {
		// log progress
		this.sdk.log(this, 'log', logPrefix.concat(['storage.createUrl.https >', uri]))

		// return link
		return Promise.resolve(uri)
	}

	// log progress
	this.sdk.log(this, 'log', logPrefix.concat(['storage.createUrl.local >', uri]))

	return Promise.reject('not implemented')
}
