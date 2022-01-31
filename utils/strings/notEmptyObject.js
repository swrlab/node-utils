const isObject = require('./isObject')
const getObjectLength = require('./getObjectLength')

// check if a variable is an empty object
module.exports = (value) => isObject(value) && getObjectLength(value) > 0
