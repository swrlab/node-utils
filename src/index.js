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

	// configure logging
	this.config = {
		logging: config.logging,
	};

	// set logging
	this.sdk.log = (that, level, message) => {
		if (message instanceof Array) {
			message = message.join(' ');
		}

		if (level == 'log') {
			that.config.logging ? console.log(message) : null;
		} else if (level == 'warn') {
			that.config.logging ? console.warn(message) : null;
		} else if (level == 'error') {
			that.config.logging ? console.error(message) : null;
		}
	};

	this.sdk.log(this, 'log', ['storage.index', 'loaded config >', JSON.stringify({ config })]);
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
