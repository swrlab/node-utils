const notNullOrUndefined = require('./notNullOrUndefined')

// check if a variable is really an array
module.exports = (value) => notNullOrUndefined(value) && value instanceof Array
