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

module.exports = async function (uri) {
	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		const structure = uri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// delete from gcp
		await this.sdk.gs.bucket(bucket).file(path).delete(path)

		// return ok
		return Promise.resolve()
	}

	if (
		uri.substr(0, 7).toLowerCase() === 'http://' ||
		uri.substr(0, 8).toLowerCase() === 'https://'
	) {
		// return ok
		return Promise.resolve()
	}

	// delete file
	await deleteLocalFile(this, uri)

	// return ok
	return Promise.resolve()
}
