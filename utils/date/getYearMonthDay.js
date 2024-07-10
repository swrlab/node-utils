const { DateTime } = require('luxon')

// get YYYYMMDD (returns '19700101')
module.exports = (date) =>
	DateTime.fromISO(date).setLocale('de').toFormat('yyyyLLdd')
