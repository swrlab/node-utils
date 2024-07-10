/*

	node-storage-wrapper

	This module provides easy access to combine bucket + path to unique URIs

*/

module.exports = async function (uri, ttl) {
	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		const structure = uri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// set config
		const config = {
			action: 'read',
			expires: Date.now() + ttl,
		}

		// create link
		const [url] = await this.sdk.gs
			.bucket(bucket)
			.file(path)
			.getSignedUrl(config)

		// return link
		return Promise.resolve(url)
	}

	if (
		uri.substr(0, 7).toLowerCase() === 'http://' ||
		uri.substr(0, 8).toLowerCase() === 'https://'
	) {
		// return link
		return Promise.resolve(uri)
	}

	return Promise.reject(new Error('not implemented'))
}
