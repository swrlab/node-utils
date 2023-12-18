const getMs = require('./getMs')
const getNow = require('./getNow')

// get MS value of current time
module.exports = () => getMs(getNow())
