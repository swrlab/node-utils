const { DateTime } = require('luxon')

// returns 'Do, 1. Januar 1970'
module.exports = (date) => DateTime.fromISO(date).setLocale('de').toFormat('ccc, d. LLLL yyyy')
