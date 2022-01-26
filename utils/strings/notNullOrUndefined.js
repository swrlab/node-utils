const isNull = require('./isNull')
const isUndefined = require('./isUndefined')

// check if a variable is neither null nor undefined
module.exports = (value) => !isNull(value) && !isUndefined(value)
