// import utils
const isArray = require('./isArray')
const notNullOrUndefined = require('./notNullOrUndefined')

// check if a variable is really an object
module.exports = (value) =>
	notNullOrUndefined(value) && value instanceof Object && !isArray(value)
