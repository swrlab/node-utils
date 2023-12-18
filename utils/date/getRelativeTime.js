const { DateTime } = require('luxon')

// get relative years (returns 'in YY Jahren')
module.exports = (date) => DateTime.fromISO(date).setLocale('de').toRelative()



