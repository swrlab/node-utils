const { DateTime } = require('luxon')

// get YYYYMMDD (returns '19700101')
module.exports = (date, withDashes) =>
	withDashes
		? DateTime.fromISO(date).setLocale('de').toFormat('yyyy-LL-dd')
		: parseInt(DateTime.fromISO(date).setLocale('de').toFormat('yyyyLLdd'))
