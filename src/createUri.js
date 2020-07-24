/*

	node-storage-wrapper

	This module provides easy access to combine bucket + path to unique URIs

*/

module.exports = {
	s3: (bucket, path) => {
		return ['s3:/', bucket, path].join('/');
	},
	gs: (bucket, path) => {
		return ['gs:/', bucket, path].join('/');
	},
}
