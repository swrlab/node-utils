const isArray = require('./isArray')

// check if a variable is an empty array
module.exports = (value) => isArray(value) && value.length > 0
