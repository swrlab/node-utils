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
	if (!config || !config.gs) {
		return Promise.reject('storage config invalid');
	}

	// enable SDKs
	this.sdk = {};

	// load node utils
	this.sdk.fs = fs;

	// load google cloud storage sdk
	this.sdk.gs = new Storage(config.gs);

	// load aws sdk
	if (config.s3) {
		this.sdk.s3 = new AWS.S3(config.s3);
	}

	// configure logging
	this.config = {
		logging: config.logging,
	};

	// set logging
	this.sdk.log = function (that, level, message) {
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

	// import functions
	this.createUri = require('./createUri');
	this.createUrl = require('./createUrl');
	this.delete = require('./delete');
	this.list = require('./list');
	this.load = require('./load');
	this.move = require('./move');
	this.save = require('./save');

	// log progress
	this.sdk.log(this, 'log', [
		'storage.index',
		'loaded config',
		JSON.stringify({
			gs: config.gs ? config.gs.projectId : null,
			s3: config.s3 ? { accessKeyId: config.s3.accessKeyId, region: config.s3.region } : null,
		}),
	]);
}

// export
module.exports = StorageWrapper;
