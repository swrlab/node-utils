/*

	node-storage-wrapper

	This module provides easy access to combine bucket + path to unique URIs

*/

module.exports = async function (uri, ttl) {
	try {
		if (uri.substr(0, 5).toLowerCase() == 's3://') {
			// log progress
			this.sdk.log(this, 'log', ['storage.createUrl.aws >', uri]);

			return Promise.reject('not implemented');
		} else if (uri.substr(0, 5).toLowerCase() == 'gs://') {
			// google cloud storage
			let structure = uri.substr(5).split('/');
			let bucket = structure.shift();
			let path = structure.join('/');

			// log progress
			this.sdk.log(this, 'log', ['storage.createUrl.gcp >', uri]);

			// set config
			const config = {
				action: 'read',
				expires: Date.now() + ttl,
			};

			// create link
			var [url] = await this.sdk.gs.bucket(bucket).file(path).getSignedUrl(config);

			// return link
			return Promise.resolve(url);
		} else if (
			uri.substr(0, 7).toLowerCase() == 'http://' ||
			uri.substr(0, 8).toLowerCase() == 'https://'
		) {
			// log progress
			this.sdk.log(this, 'log', ['storage.createUrl.https >', uri]);

			// return link
			return Promise.resolve(uri);
		} else {
			// log progress
			this.sdk.log(this, 'log', ['storage.createUrl.local >', uri]);

			return Promise.reject('not implemented');
		}
	} catch (err) {
		return Promise.reject(err);
	}
};
