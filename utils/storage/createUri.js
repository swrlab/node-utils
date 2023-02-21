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
