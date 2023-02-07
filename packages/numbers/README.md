# SWR Audio Lab / Numbers

Common number and math helpers.

- [SWR Audio Lab / Numbers](#swr-audio-lab--numbers)
  - [Install](#install)
  - [`isEven` - check if a value is even](#iseven---check-if-a-value-is-even)
  - [`round` - check if a value is even](#round---check-if-a-value-is-even)
  - [`toReadable` - get a number in readable format](#toreadable---get-a-number-in-readable-format)

## Install

Add the parent package to your dependencies:

```sh
yarn add @swrlab/utils
```

## `isEven` - check if a value is even

- `value` (required) - Value to check

Import the library:

```js
const { isEven } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
isEven(2)
// true

isEven(1)
// false
```

## `round` - check if a value is even

- `value` (required) - Float value to round
- `decimal` (required) - Decimal places to round

Import the library:

```js
const { round } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
round(1.23456, 2)
// 1.23

round(1.23456, 4)
// 1.2346
```

## `toReadable` - get a number in readable format

- `value` (required) - Value to convert

Import the library:

```js
const { toReadable } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
toReadable(1234567)
// 1.234.567
```
