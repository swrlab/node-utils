/*

	node-storage-wrapper

*/

const deleteLocalFile = (that, filePath) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.unlink(filePath, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});

module.exports = async function (uri) {
	try {
		let structure, bucket, path;

		if (uri.substr(0, 5).toLowerCase() == 's3://') {
			// aws s3 file
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// log progress
			this.log('log', ['storage.delete.s3 >', uri]);

			// delete from aws
			await this.sdk.s3
				.deleteObject({
					Bucket: bucket,
					Key: path,
				})
				.promise();

			// return ok
			return Promise.resolve();
		} else if (uri.substr(0, 5).toLowerCase() == 'gs://') {
			// google cloud storage
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// log progress
			this.log('log', ['storage.delete.gs >', uri]);

			// delete from gcp
			await this.sdk.gs.bucket(bucket).file(path).delete(path);

			// return ok
			return Promise.resolve();
		} else {
			// log progress
			this.log('log', ['storage.delete.local >', uri]);

			// delete file
			await deleteLocalFile(this, uri);

			// return ok
			return Promise.resolve();
		}
	} catch (err) {
		return Promise.reject(err);
	}
};
