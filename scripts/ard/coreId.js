const process = require('node:process')
const createHashedId = require('../../utils/ard/createHashedId')

const input = process.argv.slice(2)

console.info('INPUT:')
console.info(input)
console.info(' ')
console.info('OUTPUT (CRC64-ECMA182):')
console.info(createHashedId(input))
