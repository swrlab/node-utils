/*

	node-storage-wrapper

*/

// load node utils
const fetch = require('node-fetch');

const loadLocalFile = (that, uri) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.readFile(uri, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});

module.exports = async function (uri) {
	try {
		let structure, bucket, path, file;

		if (uri.substr(0, 5).toLowerCase() == 's3://') {
			// aws s3 file
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// log progress
			this.sdk.log(this, 'log', ['storage.load.aws >', uri]);

			// load file
			let file = await this.sdk.s3
				.getObject({
					Bucket: bucket,
					Key: path,
				})
				.promise();

			// return file
			return Promise.resolve(file.Body);
		} else if (uri.substr(0, 5).toLowerCase() == 'gs://') {
			// google cloud storage
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			this.sdk.log(this, 'log', ['storage.load gcp >', uri]);

			// load file
			file = await this.sdk.gs.bucket(bucket).file(path).download();

			// return file
			return Promise.resolve(file[0]);
		} else if (
			uri.substr(0, 7).toLowerCase() == 'http://' ||
			uri.substr(0, 8).toLowerCase() == 'https://'
		) {
			// log progress
			this.sdk.log(this, 'log', ['storage.load.https >', uri]);

			// public http(s) endpoint
			let file = await fetch(uri);

			if (file.ok) {
				file = await file.buffer();
				return Promise.resolve(file);
			} else {
				return Promise.reject('fetching url failed with status > ' + file.status);
			}
		} else {
			// local file
			let file = await loadLocalFile(this, uri);

			this.sdk.log(this, 'log', ['storage.load.local >', uri]);

			return Promise.resolve(file);
		}
	} catch (err) {
		return Promise.reject(err);
	}
};
