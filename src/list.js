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
				MaxKeys: 200,
				ContinuationToken: next,
			})
			.promise();

		// return only list and next token
		return Promise.resolve({
			list: files.Contents,
			next: files.IsTruncated ? files.NextContinuationToken : null,
		});
	} catch (err) {
		this.error('error', [
			'storage.list.awsListObjects',
			JSON.stringify({ bucket, path, next, message: err.message, stack: err.stack })
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

module.exports = async function (uri) {
	try {
		let structure, bucket, path, file;

		if (uri.substr(0, 5).toLowerCase() == 's3://') {
			// aws s3 file
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// log progress
			this.log('log', ['storage.list.aws >', uri]);

			// load file
			var next;
			let fileList = [];

			do {
				// load data
				let awsReturn = await awsListObjects(this, bucket, path, next ? next : null);

				// set next token
				next = awsReturn.next;

				// add to return list
				fileList = fileList.concat(awsReturn.list);
			} while (next);

			// return list
			return Promise.resolve(fileList);
		} else if (uri.substr(0, 5).toLowerCase() == 'gs://') {
			// google cloud storage
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// log request
			this.log('log', ['storage.list.gcp >', uri]);

			// load file
			file = await this.sdk.gs.bucket(bucket).getFiles({
				prefix: path,
			});

			// return list
			return Promise.resolve(file[0]);
		} else {
			// log request
			this.log('log', ['storage.list.local >', uri]);

			// local file
			let file = await listLocalFiles(this, uri);

			// return list
			return Promise.resolve(file);
		}
	} catch (err) {
		this.log('error', ['storage.list', JSON.stringify({ uri, message: err.message, stack: err.stack })]);
		return Promise.reject(err);
	}
};
