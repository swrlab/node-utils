# SWR Audio Lab / Numbers

Common number and math helpers.

- [SWR Audio Lab / Numbers](#swr-audio-lab--numbers)
  - [Install](#install)
  - [`isEven` - check if a value is even](#iseven---check-if-a-value-is-even)

## Install

Add the parent package to your dependencies:

```sh
yarn add @swrlab/utils
```

## `isEven` - check if a value is even

- `value` (required) - Value to check

Import the library:

```js
const { isEven } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
isEven(2)
// true

isEven(1)
// false
```
