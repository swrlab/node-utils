// add leading zero if not existent
module.exports = (value) => (value < 10 ? `0${value}` : value).toString()
