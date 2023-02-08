# SWR Audio Lab / Numbers

Common number and math helpers.

- [SWR Audio Lab / Numbers](#swr-audio-lab--numbers)
  - [Install](#install)
  - [`addLeadingZero` - add leading zero to number](#addleadingzero---add-leading-zero-to-number)
  - [`addTrailingZeros` - add trailing zeros to number](#addtrailingzeros---add-trailing-zeros-to-number)
  - [`getAverage` - get average from array of numbers](#getaverage---get-average-from-array-of-numbers)
  - [`getDiff` - get difference of two numbers](#getdiff---get-difference-of-two-numbers)
  - [`getRandomIn` - get random int between min and max](#getrandomin---get-random-int-between-min-and-max)
  - [`getSum` - get sum from array of numbers](#getsum---get-sum-from-array-of-numbers)
  - [`isEven` - check if a value is even](#iseven---check-if-a-value-is-even)
  - [`roundTo` - round float to a specified decimal place](#roundto---round-float-to-a-specified-decimal-place)
  - [`toReadable` - get a number in readable format](#toreadable---get-a-number-in-readable-format)

## Install

Add the parent package to your dependencies:

```sh
yarn add @swrlab/utils
```

## `addLeadingZero` - add leading zero to number

- `value` (required) - Value to add leading zero

Import the library:

```js
const { addLeadingZero } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
addLeadingZero(1)
// '01'

addLeadingZero(10)
// '10'
```

## `addTrailingZeros` - add trailing zeros to number

- `value` (required) - Value to add trailing zeros
- `length` (required) - Amount of the digits after delimiter
- `delimiter` (optional) - Delimiter for trailing zeros (default .)

Import the library:

```js
const { addTrailingZeros } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
addTrailingZeros(1, 5)
// '1.00000'

addTrailingZeros(1.1, 5)
// '1.10000'

addTrailingZeros('1.2', 5)
// '1.20000'

addTrailingZeros(2, 2, ',')
// '2,00'

addTrailingZeros(2.1, 2, ',')
// '2,10'

addTrailingZeros('2,2', 2, ',')
// '2,20'
```

## `getAverage` - get average from array of numbers

- `array` (required) - Array of numbers
- `decimal` (optional) - Decimal places to round (default 2)

Import the library:

```js
const { getAverage } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
getAverage([1, 2, 3])
// 2

getAverage([1.2, 2.4, 3.6], 1)
// 2.4
```

## `getDiff` - get difference of two numbers

- `value a` (required) - value to subtract from
- `value b` (required) - value to subtract

Import the library:

```js
const { getDiff } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
getDiff(2, 1)
// 1

getDiff(1, 2)
// -1
```

## `getRandomIn` - get random int between min and max

- `min` (required) - Min value (inclusive)
- `max` (required) - Max value (inclusive)

Import the library:

```js
const { getRandomIn } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
getRandomIn(1, 5)
// 1,2,3,4 or 5

getRandomIn(5, 9)
// 5,6,7,8 or 9
```

## `getSum` - get sum from array of numbers

- `array` (required) - Array of numbers
- `decimal` (optional) - Decimal places to round (default 2)

Import the library:

```js
const { getSum } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
getSum([1, 2, 3])
// 6

getSum([1.2, 2.4, 3.6], 1)
// 7.2
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

## `toReadable` - get a number in readable format

- `value` (required) - Value to convert

Import the library:

```js
const { toReadable } = require('@swrlab/utils/packages/numbers')
```

Then use the toolkit:

```js
toReadable(1234567)
// '1.234.567'
```
