// get average from array of values
const sum = require('./sum')

module.exports = (arr, decimals = 2) => sum(arr, decimals) / arr.length
