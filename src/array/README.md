# SWR Audio Lab / Array

Common array utilities.

- [SWR Audio Lab / Array](#swr-audio-lab--array)
  - [Install](#install)
  - [`arrayToObjectCount` - reduce array elements to object with count](#arraytoobjectcount---reduce-array-elements-to-object-with-count)
  - [`isEmptyArray` - check if a value is an empty array](#isemptyarray---check-if-a-value-is-an-empty-array)
  - [`notEmptyArray` - check if a value is not an empty array](#notemptyarray---check-if-a-value-is-not-an-empty-array)

## Install

Add the parent package to your dependencies:

```sh
npm add @swrlab/utils
```

## `arrayToObjectCount` - reduce array elements to object with count

- `value` (required) - Array to get entries from

Import the library:

```js
import { arrayToObjectCount } from '@swrlab/utils/array'
```

Then use the toolkit:

```js
arrayToObjectCount(['foo', 'bar', 'bar'])
// { bar: 2, foo: 1 }
```

## `isEmptyArray` - check if a value is an empty array

- `value` (required) - Value to check

Import the library:

```js
import { isEmptyArray } from '@swrlab/utils/array'
```

Then use the toolkit:

```js
isEmptyArray([])
// true

isEmptyArray(['hello world'])
// false
```

## `notEmptyArray` - check if a value is not an empty array

- `value` (required) - Value to check

Import the library:

```js
import { notEmptyArray } from '@swrlab/utils/array'
```

Then use the toolkit:

```js
notEmptyArray(['hello world'])
// true

notEmptyArray([])
// false
```
