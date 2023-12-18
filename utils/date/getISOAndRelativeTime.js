const getRelativeTime = require('./getRelativeTime')

// get iso date with relative years
module.exports = (date) => `${date} (${getRelativeTime(date)})`
