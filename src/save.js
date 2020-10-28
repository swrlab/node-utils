/*

	node-storage-wrapper

*/

// load node utils
const os = require('os');
const pathUtil = require('path');
const { v4: uuidv4 } = require('uuid');

const saveLocalFile = (that, uri, buffer) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.writeFile(uri, buffer, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});

const deleteLocalFile = (that, filePath) =>
	new Promise((resolve, reject) => {
		that.sdk.fs.unlink(filePath, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});

module.exports = async function (uri, buffer, logPrefix) {
	try {
		logPrefix = logPrefix ? [logPrefix, '>'] : [];
		let structure, bucket, path;

		if (uri.substr(0, 5).toLowerCase() == 's3://') {
			// aws s3 file
			structure = uri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// log progress
			this.sdk.log(this, 'log', [logPrefix ? logPrefix : undefined, 'storage.save.s3 >', uri]);

			// upload to aws
			await this.sdk.s3
				.upload({
					Bucket: bucket,
					Body: buffer,
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

			// save to local file
			let tempFilePath = pathUtil.resolve(os.tmpdir(), uuidv4());
			await saveLocalFile(this, tempFilePath, buffer);

			// log progress
			this.sdk.log(this, 'log', [logPrefix ? logPrefix : undefined, 'storage.save.gs >', uri]);

			// upload file to gcs
			await this.sdk.gs.bucket(bucket).upload(tempFilePath, {
				gzip: false,
				destination: path,
				metadata: {},
			});

			// delete local temp file
			await deleteLocalFile(this, tempFilePath);

			// return ok
			return Promise.resolve();
		} else {
			// local file

			// log progress
			this.sdk.log(this, 'log', [logPrefix ? logPrefix : undefined, 'storage.save.local >', uri]);

			// save file
			let file = await saveLocalFile(this, uri, buffer);

			// return ok
			return Promise.resolve(file);
		}
	} catch (err) {
		return Promise.reject(err);
	}
};
