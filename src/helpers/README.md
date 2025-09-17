# SWR Audio Lab / Helpers

Common functions and helpers.

- [SWR Audio Lab / Helpers](#swr-audio-lab--helpers)
  - [Install](#install)
  - [`sleep` - sleep a given time (async)](#sleep---sleep-a-given-time-async)

## Install

Add the parent package to your dependencies:

```sh
npm install @swrlab/utils
```

## `sleep` - sleep a given time (async)

- `value` (required) - Value to sleep (in ms)

Import the library:

```js
import { sleep } from '@swrlab/utils/helpers'
```

Then use the toolkit:

```js
await sleep(1e3)
// will sleep 1s
```
