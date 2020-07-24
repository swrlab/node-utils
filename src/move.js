/*

	node-storage-wrapper

*/

// load own sub-utils
const storage = {
	delete: require('./delete'),
	load: require('./load'),
	save: require('./save'),
};

module.exports = async function (sourceUri, destinationUri, keepOriginal) {
	try {
		let structure, bucket, path, blob;

		if (
			sourceUri.substr(0, 5).toLowerCase() == 'gs://' &&
			destinationUri.substr(0, 5).toLowerCase() == 'gs://'
		) {
			// google to google transfer

			// parse source
			structure = sourceUri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// move file within gcs
			if (keepOriginal != true) {
				// move is productive/ destructive
				this.log('log', ['storage.move.gcp2gcp >', sourceUri, destinationUri]);

				// move file
				await this.sdk.gs.bucket(bucket).file(path).move(destinationUri);
			} else {
				// mode is dev, only copy file
				this.log('log', ['storage.move.gcp2gcp (only copying) >', sourceUri, destinationUri]);

				// copy file
				await this.sdk.gs.bucket(bucket).file(path).copy(destinationUri);
			}

			// return ok
			return Promise.resolve();
		} else if (
			sourceUri.substr(0, 5).toLowerCase() == 's3://' &&
			destinationUri.substr(0, 5).toLowerCase() == 's3://'
		) {
			// google to google transfer

			// parse source
			structure = destinationUri.substr(5).split('/');
			bucket = structure.shift();
			path = structure.join('/');

			// always copying
			this.log('log', ['storage.move.aws2aws copying >', sourceUri, destinationUri]);

			// copy file
			await this.sdk.s3.copyObject({
				Bucket: bucket,
				Key: path,
				CopySource: sourceUri.replace('s3://', '/'),
			}).promise();

			// move file within gcs
			if (keepOriginal != true) {
				// move is productive/ destructive
				this.log('log', ['storage.move.aws2aws deleting source >', sourceUri]);

				// parse source
				structure = sourceUri.substr(5).split('/');
				bucket = structure.shift();
				path = structure.join('/');

				// move file
				await this.sdk.s3.deleteObject({
					Bucket: bucket,
					Key: path,
				}).promise();
			}

			// return ok
			return Promise.resolve();
		} else {
			// any to any transfer
			this.log('log', ['storage.move.any2any >', keepOriginal, sourceUri, destinationUri]);

			// download file
			blob = await storage.load(sourceUri);

			// save file to destination
			await storage.save(destinationUri, blob);

			// delete file if in production
			if (keepOriginal != true) {
				await storage.delete(sourceUri);
			} else {
				this.log('log', ['storage.move.any2any not deleting sourceUri >', keepOriginal, sourceUri]);
			}

			// return ok
			return Promise.resolve();
		}
	} catch (err) {
		this.log('error', [
			'storage.move',
			JSON.stringify({
				sourceUri,
				destinationUri,
				keepOriginal,
				message: err.message,
				stack: err.stack,
			}),
		]);
		return Promise.reject(err);
	}
};
