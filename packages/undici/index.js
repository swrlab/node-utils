/*

	by SWR Audio Lab

	this file runs the undici-wrapper util

*/

// load request handler
const undici = require('../../utils/undici/index')

// export handler
module.exports = undici()
