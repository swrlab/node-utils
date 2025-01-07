# SWR Audio Lab / Undici

See [undici.nodejs.org](https://undici.nodejs.org) for the full Undici configuration and usage.

- [SWR Audio Lab / Undici](#swr-audio-lab--undici)
  - [Import](#import)
  - [Request](#request)

## Import

Basic import:

```js
// load request handler
const undici = require('@swrlab/utils/packages/undici')

// export handler
module.exports = undici()
```

Import with Datadog tracer enabled:

```js
// add tracing
const tracer = process.env.DD_TRACE_ENABLED === 'true' ? require('../tracer') : null

// load request handler
const undici = require('@swrlab/utils/packages/undici')

// export handler
module.exports = undici(tracer)
```

## Request

Simple request:

```js
const data = await undici(someApiUrl)
```

Advanced usage:

```js
const data = await undici(someApiUrl, {
  method: 'GET',
  timeout: 6e3,
  reject: false,
  maxRedirections: 5,
})
```

You can also use object desctructuring for easy access to the output:

```js
const { headers, statusCode, json } = await undici(someApiUrl)
```
