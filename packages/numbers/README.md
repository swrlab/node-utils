# SWR Audio Lab / Numbers

Common number and math helpers.

- [SWR Audio Lab / Numbers](#swr-audio-lab--numbers)
  - [Install](#install)
  - [`isEven` - check if a value is even](#iseven---check-if-a-value-is-even)
  - [`randomIn` - get random int between min and max](#randomin---get-random-int-between-min-and-max)
  - [`roundTo` - round float to a specified decimal place](#roundto---round-float-to-a-specified-decimal-place)
  - [`sum` - get sum from array of numbers](#sum---get-sum-from-array-of-numbers)
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

- `min` (required) - Min value (inclusive)
- `max` (required) - Max value (inclusive)

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
- `decimal` (optional) - Decimal places to round (default 2)

Import the library:

```js
const { roundTo } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
roundTo(1.23456)
// 1.23

roundTo(1.23456, 4)
// 1.2346
```

## `sum` - get sum from array of numbers

- `array` (required) - Array of numbers
- `decimal` (optional) - Decimal places to round (default 2)

Import the library:

```js
const { sum } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
sum([1, 2, 3])
// 6

sum([1.2, 2.4, 3.6], 1)
// 7.2
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
