/*

	node-storage-wrapper

*/

module.exports = async function (sourceUri, destinationUri, keepOriginal, logPrefix) {
	try {
		logPrefix = logPrefix ? [logPrefix, '>'] : [];
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
				this.sdk.log(
					this,
					'log',
					logPrefix.concat(['storage.move.gcp2gcp >', sourceUri, destinationUri])
				);

				// move file
				await this.sdk.gs.bucket(bucket).file(path).move(destinationUri);
			} else {
				// mode is dev, only copy file
				this.sdk.log(
					this,
					'log',
					logPrefix.concat([
						'storage.move.gcp2gcp (only copying) >',
						sourceUri,
						destinationUri,
					])
				);

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
			this.sdk.log(
				this,
				'log',
				logPrefix.concat(['storage.move.aws2aws copying >', sourceUri, destinationUri])
			);

			// copy file
			await this.sdk.s3
				.copyObject({
					Bucket: bucket,
					Key: path,
					CopySource: sourceUri.replace('s3://', '/'),
				})
				.promise();

			// move file within gcs
			if (keepOriginal != true) {
				// move is productive/ destructive
				this.sdk.log(
					this,
					'log',
					logPrefix.concat(['storage.move.aws2aws deleting source >', sourceUri])
				);

				// parse source
				structure = sourceUri.substr(5).split('/');
				bucket = structure.shift();
				path = structure.join('/');

				// move file
				await this.sdk.s3
					.deleteObject({
						Bucket: bucket,
						Key: path,
					})
					.promise();
			}

			// return ok
			return Promise.resolve();
		} else {
			// any to any transfer
			this.sdk.log(
				this,
				'log',
				logPrefix.concat(['storage.move.any2any >', keepOriginal, sourceUri, destinationUri])
			);

			// download file
			blob = await this.load(sourceUri);

			// save file to destination
			await this.save(destinationUri, blob);

			// delete file if in production
			if (keepOriginal != true) {
				await this.delete(sourceUri);
			} else {
				this.sdk.log(
					this,
					'log',
					logPrefix.concat([
						'storage.move.any2any not deleting sourceUri >',
						keepOriginal,
						sourceUri,
					])
				);
			}

			// return ok
			return Promise.resolve();
		}
	} catch (err) {
		return Promise.reject(err);
	}
};
