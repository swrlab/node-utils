/*

	node-storage-wrapper

*/

// load node utils
const fetch = require('node-fetch');
const http = require('http');
const https = require('https');

// enable keepalive
const httpAgent = new http.Agent({
	keepAlive: true,
});
const httpsAgent = new https.Agent({
	keepAlive: true,
});

const loadLocalFile = (that, uri) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.readFile(uri, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});

module.exports = async function (uri, logPrefix) {
	try {
		logPrefix = logPrefix ? [logPrefix, '>'] : [];
		let structure, bucket, path, file;

		if (uri.substr(0, 5).toLowerCase() == 's3://') {
			// aws s3 file
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// log progress
			this.sdk.log(this, 'log', logPrefix.concat(['storage.load.aws >', uri]));

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

			this.sdk.log(this, 'log', logPrefix.concat(['storage.load gcp >', uri]));

			// load file
			file = await this.sdk.gs.bucket(bucket).file(path).download();

			// return file
			return Promise.resolve(file[0]);
		} else if (
			uri.substr(0, 7).toLowerCase() == 'http://' ||
			uri.substr(0, 8).toLowerCase() == 'https://'
		) {
			// log progress
			this.sdk.log(this, 'log', logPrefix.concat(['storage.load.https >', uri]));

			// public http(s) endpoint
			let file = await fetch(uri, {
				method: 'get',

				headers: {
					'User-Agent': 'node-storage-wrapper',
					Connection: 'keep-alive',
				},

				agent: function (_parsedURL) {
					if (_parsedURL.protocol == 'http:') {
						return httpAgent;
					} else {
						return httpsAgent;
					}
				},
			});

			if (file.ok) {
				file = await file.buffer();
				return Promise.resolve(file);
			} else {
				return Promise.reject('fetching url failed with status > ' + file.status);
			}
		} else {
			// log progress
			this.sdk.log(this, 'log', logPrefix.concat(['storage.load.local >', uri]));

			// local file
			let file = await loadLocalFile(this, uri);

			// return file
			return Promise.resolve(file);
		}
	} catch (err) {
		return Promise.reject(err);
	}
};
