# SWR Audio Lab / Helpers

Common functions and helpers.

- [SWR Audio Lab / Helpers](#swr-audio-lab--helpers)
  - [Install](#install)
  - [`getJsonKeys` - get all keys of json input](#getjsonkeys---get-all-keys-of-json-input)
  - [`sleep` - sleep a given time (async)](#sleep---sleep-a-given-time-async)

## Install

Add the parent package to your dependencies:

```sh
yarn add @swrlab/utils
```

## `getJsonKeys` - get all keys of json input

- `value` (required) - Json to get keys from

Import the library:

```js
const { getJsonKeys } = require('@swrlab/utils/packages/helpers')
```

Then use the toolkit:

```js
getJsonKeys({ hello: 'world', foo: 'bar' })
// ['hello', 'foo']
```

## `sleep` - sleep a given time (async)

- `value` (required) - Value to sleep (in ms)

Import the library:

```js
const { sleep } = require('@swrlab/utils/packages/helpers')
```

Then use the toolkit:

```js
await sleep(1e3)
// will sleep 1s
```
