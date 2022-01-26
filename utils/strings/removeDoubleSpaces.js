// remove duplicate spaces from a string
module.exports = (value) => value.replace(/ +(?= )/g, '')
