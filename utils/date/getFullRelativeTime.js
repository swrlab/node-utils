const getDateHourMinutes = require('./getDateHourMinutes')
const getRelativeTime = require('./getRelativeTime')

// returns 'Do, 1. Januar 1970 - 00:00 Uhr (in YY Jahren)'
module.exports = (date) => `${getDateHourMinutes(date)} (${getRelativeTime(date)})`
