const { DateTime } = require('luxon')

// parse ISO format
module.exports = (iso) => DateTime.fromISO(iso)
