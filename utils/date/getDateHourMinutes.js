const { DateTime } = require('luxon')

// returns 'Di, 19. Januar 2038 - 03:14 Uhr'
const dayHourMinutes = 'ccc, d. LLLL yyyy - HH:mm'
module.exports = (date) =>
	`${DateTime.fromISO(date).setLocale('de').toFormat(dayHourMinutes)} Uhr`
