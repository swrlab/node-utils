/*

	node-storage-wrapper

*/

// load node utils
var AWS = require('aws-sdk');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');

// create wrapper
function StorageWrapper(config) {
	// check config
	if (!config || !config.gs || !config.s3) {
		return Promise.reject('storage config invalid');
	}

	// enable SDKs
	this.sdk = {};

	// load node utils
	this.sdk.fs = fs;

	// load google cloud storage sdk
	this.sdk.gs = new Storage(config.gs);

	// load aws sdk
	AWS.config.loadFromPath(config.s3);
	this.sdk.s3 = new AWS.S3();

	// enable logging
	this.log = config.logging
		? (level, message) => {
				if (message instanceof Array) {
					message = message.join(' ');
				}

				if (level == 'log') {
					console.log(message);
				} else if (level == 'warn') {
					console.warn(message);
				} else if (level == 'error') {
					console.error(message);
				}
		}
		: null;

	this.log('log', ['storage.index', 'loaded config >', JSON.stringify({ config })]);
}

// enable utils
StorageWrapper.prototype.createUri = require('./createUri');
StorageWrapper.prototype.delete = require('./delete');
StorageWrapper.prototype.list = require('./list');
StorageWrapper.prototype.load = require('./load');
StorageWrapper.prototype.move = require('./move');
StorageWrapper.prototype.save = require('./save');

// export
module.exports = StorageWrapper;
