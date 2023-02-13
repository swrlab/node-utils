// get average from array of values
const sum = require('./getSum')

module.exports = (arr, decimals = 2) => sum(arr, decimals) / arr.length
