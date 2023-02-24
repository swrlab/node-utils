// load utils
const request = require('./request')

// export handler with tracing, if enabled
module.exports = (tracer) => tracer?.wrap('undici.request', request) || request
