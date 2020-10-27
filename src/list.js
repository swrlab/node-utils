/*

	node-storage-wrapper

*/

const awsListObjects = async (that, bucket, path, next) => {
	try {
		// load list from aws, pass next token (nullable)
		let files = await that.sdk.s3
			.listObjectsV2({
				Bucket: bucket,
				Prefix: path,
				MaxKeys: 500,
				ContinuationToken: next,
			})
			.promise();

		// return only list and next token
		return Promise.resolve({
			list: files.Contents,
			next: files.IsTruncated ? files.NextContinuationToken : null,
		});
	} catch (err) {
		that.sdk.log('error', [
			'storage.list.awsListObjects',
			JSON.stringify({ bucket, path, next, message: err.message, stack: err.stack }),
		]);
		return Promise.reject(err);
	}
};

const listLocalFiles = (that, uri) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.readdir(uri, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});

module.exports = async function (uri, max, next) {
	try {
		let structure, bucket, path, file;

		if (uri.substr(0, 5).toLowerCase() == 's3://') {
			// aws s3 file
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// log progress
			this.sdk.log(this, 'log', ['storage.list.aws >', uri, max]);

			// load file
			let maxNotReached = true;
			let fileList = [];

			do {
				// load data
				let awsReturn = await awsListObjects(this, bucket, path, next ? next : null);

				// add to return list
				fileList = fileList.concat(awsReturn.list);

				// set next token
				next = awsReturn.next;

				// calculate max reached
				maxNotReached = max && fileList.length < max ? true : false;
			} while (next && maxNotReached);

			// return list
			return Promise.resolve({ list: fileList, next });
		} else if (uri.substr(0, 5).toLowerCase() == 'gs://') {
			// google cloud storage
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// log request
			this.sdk.log(this, 'log', ['storage.list.gcp >', uri]);

			// load file
			file = await this.sdk.gs.bucket(bucket).getFiles({
				prefix: path,
			});

			// return list
			return Promise.resolve(file[0]);
		} else {
			// log request
			this.sdk.log(this, 'log', ['storage.list.local >', uri]);

			// local file
			let file = await listLocalFiles(this, uri);

			// return list
			return Promise.resolve(file);
		}
	} catch (err) {
		return Promise.reject(err);
	}
};
