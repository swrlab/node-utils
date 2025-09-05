const { DateTime } = require('luxon')

// get hours and minutes (returns '12:34')
module.exports = (date) => DateTime.fromISO(date).toFormat('HH:mm')
