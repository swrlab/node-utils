/*

	node-storage-wrapper

*/

const listLocalFiles = (that, uri) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.readdir(uri, 'utf8', (err, data) => {
			if (err) reject(err)
			else resolve(data)
		})
	})

module.exports = async function (uri) {
	if (uri.substr(0, 5).toLowerCase() === 'gs://') {
		// google cloud storage
		const structure = uri.substr(5).split('/')
		const bucket = structure.shift()
		const path = structure.join('/')

		// load file
		const file = await this.sdk.gs.bucket(bucket).getFiles({
			prefix: path,
		})

		// return list
		return Promise.resolve(file[0])
	}

	// local file
	const file = await listLocalFiles(this, uri)

	// return list
	return Promise.resolve(file)
}
