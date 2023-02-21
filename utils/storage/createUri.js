/*

	node-utils by SWR Audio Lab
	frequently used node-packages and helpers

	This module provides easy access to combine bucket + path to unique URIs

*/

module.exports = {
	s3: (bucket, path) => {
		// return data
		return ['s3:/', bucket, path].join('/')
	},
	gs: (bucket, path) => {
		// return data
		return ['gs:/', bucket, path].join('/')
	},
}
