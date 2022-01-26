// import utils
const isArray = require('./isArray')

// check if a variable is really an object
module.exports = (value) => value instanceof Object && !isArray(value)
