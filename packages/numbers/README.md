# SWR Audio Lab / Numbers

Common number and math helpers.

- [SWR Audio Lab / Numbers](#swr-audio-lab--numbers)
  - [Install](#install)
  - [`isEven` - check if a value is even](#iseven---check-if-a-value-is-even)
  - [`randomIn` - get random int between min and max](#randomin---get-random-int-between-min-and-max)
  - [`roundTo` - round float to a specified decimal place](#roundto---round-float-to-a-specified-decimal-place)
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

## `randomIn` - get random int between min and max

- `min` (required) - min value (inclusive)
- `max` (required) - max value (inclusive)

Import the library:

```js
const { randomIn } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
randomIn(1, 5)
// 1,2,3,4 or 5

randomIn(5, 9)
// 5,6,7,8 or 9
```

## `roundTo` - round float to a specified decimal place

- `value` (required) - Float value to round
- `decimal` (required) - Decimal places to round

Import the library:

```js
const { roundTo } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
roundTo(1.23456, 2)
// 1.23

roundTo(1.23456, 4)
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
