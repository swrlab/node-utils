/* eslint-disable global-require */

// load node utils
const fs = require('fs')
const { Storage } = require('@google-cloud/storage')
const { S3, S3Client } = require('@aws-sdk/client-s3')

// create wrapper
function StorageWrapper(config, logger) {
	// check config
	if (!config || !config.gs) return Promise.reject(new Error('storage config invalid'))

	// enable SDKs
	this.sdk = {}

	// load node utils
	this.sdk.fs = fs

	// load google cloud storage sdk
	this.sdk.gs = new Storage(config.gs)

	// load aws sdk
	if (config.s3) {
		this.sdk.s3 = new S3(config.s3)
		this.sdk.s3Client = new S3Client(config.s3)
	}

	// configure logging
	this.logger = logger || null
	this.logSource = '@swrlab/utils/storage'

	// import functions
	this.createUri = require('./createUri')
	this.createUrl = require('./createUrl')
	this.delete = require('./delete')
	this.exists = require('./exists')
	this.list = require('./list')
	this.load = require('./load')
	this.move = require('./move')
	this.save = require('./save')

	// log progress
	if (this.logger) {
		this.logger.log({
			level: 'info',
			message: `loaded storage config`,
			source: '@swrlab/utils/storage',
			data: {
				isLoggingEnabled: !!logger,
				gs: config.gs ? config.gs.projectId : null,
				s3: config.s3 ? { accessKeyId: config.s3.accessKeyId, region: config.s3.region } : null,
			},
		})
	}
}

// export
module.exports = StorageWrapper
