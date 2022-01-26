/*

	SWR Audio Lab

	this file runs the undici-wrapper util

*/

// load request handler
const undici = require('undici-wrapper')

// export handler
module.exports = undici()
