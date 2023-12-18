const getISO = require('./toISO')
const getNow = require('./getNow')

// get MS value of current time
module.exports = () => getISO(getNow())
