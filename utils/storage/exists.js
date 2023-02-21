/* eslint-disable func-names */

module.exports = async function (uri) {
	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		const structure = uri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// log progress
		if (this.logger) {
			this.logger.log({
				level: 'info',
				message: `storage.exists.gs > ${uri}`,
				source: this.logSource,
				data: { uri },
			})
		}

		// create link
		const [result] = await this.sdk.gs.bucket(bucket).file(path).exists()

		// return link
		return Promise.resolve(result)
	}

	return Promise.reject(new Error('not implemented'))
}
