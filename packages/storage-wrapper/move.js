/*

	node-storage-wrapper

*/

module.exports = async function (sourceUri, destinationUri, keepOriginal) {
	if (
		sourceUri.substr(0, 5).toLowerCase() === 'gs://' &&
		destinationUri.substr(0, 5).toLowerCase() === 'gs://'
	) {
		// google to google transfer

		// parse source
		const structure = sourceUri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// move file within gcs
		if (keepOriginal !== true) {
			// move file
			await this.sdk.gs.bucket(bucket).file(path).move(destinationUri)
		} else {
			// copy file
			await this.sdk.gs.bucket(bucket).file(path).copy(destinationUri)
		}

		// return ok
		return Promise.resolve()
	}

	// download file
	const blob = await this.load(sourceUri)

	// save file to destination
	await this.save(destinationUri, blob)

	// delete file if in production
	if (keepOriginal !== true) {
		await this.delete(sourceUri)
	}

	// return ok
	return Promise.resolve()
}
