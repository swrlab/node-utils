/*

	node-storage-wrapper

*/

// load node utils
const fs = require('node:fs')
const { Storage } = require('@google-cloud/storage')

// create wrapper
function StorageWrapper(config) {
	// check config
	if (!config || !config.gs) return Promise.reject(new Error('storage config invalid'))

	// enable SDKs
	this.sdk = {}

	// load node utils
	this.sdk.fs = fs

	// load google cloud storage sdk
	this.sdk.gs = new Storage(config.gs)

	// import functions
	this.createUri = require('./createUri')
	this.createUrl = require('./createUrl')
	this.delete = require('./delete')
	this.list = require('./list')
	this.load = require('./load')
	this.move = require('./move')
	this.save = require('./save')
}

// export
module.exports = StorageWrapper
