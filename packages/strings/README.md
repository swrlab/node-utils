# SWR Audio Lab / Strings, Arrays, Objects

Common string, array, object encoding and getter helpers.

- [SWR Audio Lab / Strings, Arrays, Objects](#swr-audio-lab--strings-arrays-objects)
  - [Install](#install)
  - [`capitalize` - get capitalized string](#capitalize---get-capitalized-string)
  - [`getObjectLength` - get the length of an object](#getobjectlength---get-the-length-of-an-object)
  - [`isArray` - check if a value is a proper array](#isarray---check-if-a-value-is-a-proper-array)
  - [`isEmptyArray` - check if a value is an empty array](#isemptyarray---check-if-a-value-is-an-empty-array)
  - [`isEmptyObject` - check if a value is an empty object](#isemptyobject---check-if-a-value-is-an-empty-object)
  - [`isIncluded` - check if a value (haystack) includes another value (needle)](#isincluded---check-if-a-value-haystack-includes-another-value-needle)
  - [`isNull` - check if a value is null](#isnull---check-if-a-value-is-null)
  - [`isObject` - check if a value is a proper object](#isobject---check-if-a-value-is-a-proper-object)
  - [`isUndefined` - check if a value is undefined](#isundefined---check-if-a-value-is-undefined)
  - [`notEmptyArray` - check if a value is not an empty array](#notemptyarray---check-if-a-value-is-not-an-empty-array)
  - [`notEmptyObject` - check if a value is not an empty object](#notemptyobject---check-if-a-value-is-not-an-empty-object)
  - [`notNullOrUndefined` - check if a value is neither null nor undefined](#notnullorundefined---check-if-a-value-is-neither-null-nor-undefined)
  - [`pluralize` - get pluralized string](#pluralize---get-pluralized-string)
  - [`removeDoubleSpaces` - take a string and remove its duplicate spaces](#removedoublespaces---take-a-string-and-remove-its-duplicate-spaces)
  - [`toHex` - take a string convert it to a hex string](#tohex---take-a-string-convert-it-to-a-hex-string)

## Install

Add the parent package to your dependencies:

```sh
yarn add @swrlab/utils
```

## `capitalize` - get capitalized string

- `value` (required) - Value to capitalize

Import the library:

```js
const { capitalize } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
capitalize('apple')
// Apple
```

## `getObjectLength` - get the length of an object

- `value` (required) - Value to check

Import the library:

```js
const { getObjectLength } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
getObjectLength({ hello: 'world' })
// 1

getObjectLength({ hello: 'world', foo: 'bar' })
// 2
```

## `isArray` - check if a value is a proper array

- `value` (required) - Value to check

Import the library:

```js
const { isArray } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
isArray(['hello world'])
// true

isArray('hello world')
// false
```

## `isEmptyArray` - check if a value is an empty array

- `value` (required) - Value to check

Import the library:

```js
const { isEmptyArray } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
isEmptyArray([])
// true

isEmptyArray(['hello world'])
// false
```

## `isEmptyObject` - check if a value is an empty object

- `value` (required) - Value to check

Import the library:

```js
const { isEmptyObject } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
isEmptyObject({})
// true

isEmptyObject({ hello: 'world' })
// false
```

## `isIncluded` - check if a value (haystack) includes another value (needle)

- `haystack` (required) - Array or value to check
- `needle` (required) - Array or value to check

Import the library:

```js
const { isIncluded } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
isIncluded('hello world', 'hello')
// true

isIncluded('hello world', 'earth')
// false
```

## `isNull` - check if a value is null

- `value` (required) - Value to check

Import the library:

```js
const { isNull } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
isNull(null)
// true

isNull(undefined)
// false
```

## `isObject` - check if a value is a proper object

- `value` (required) - Value to check

Import the library:

```js
const { isObject } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
isObject({ hello: 'world' })
// true

isObject('hello world')
// false
```

## `isUndefined` - check if a value is undefined

- `value` (required) - Value to check

Import the library:

```js
const { isUndefined } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
isUndefined(undefined)
// true

isUndefined(null)
// false
```

## `notEmptyArray` - check if a value is not an empty array

- `value` (required) - Value to check

Import the library:

```js
const { notEmptyArray } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
notEmptyArray(['hello world'])
// true

notEmptyArray([])
// false
```

## `notEmptyObject` - check if a value is not an empty object

- `value` (required) - Value to check

Import the library:

```js
const { notEmptyObject } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
notEmptyObject({ hello: 'world' })
// true

notEmptyObject({})
// false
```

## `notNullOrUndefined` - check if a value is neither null nor undefined

- `value` (required) - Value to check

Import the library:

```js
const { notNullOrUndefined } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
notNullOrUndefined('hello world')
// true

notNullOrUndefined(null)
// false

notNullOrUndefined(undefined)
// false
```

## `pluralize` - get pluralized string

- `value` (required) - Value to pluralize

Import the library:

```js
const { pluralize } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
pluralize(1, 'Apple')
// 1 Apple

pluralize(2, 'Apple')
// 2 Apples

pluralize(1, 'Child', 'Children')
// 1 Child

pluralize(2, 'Child', 'Children')
// 2 Children
```

## `removeDoubleSpaces` - take a string and remove its duplicate spaces

- `value` (required) - Value to convert

Import the library:

```js
const { removeDoubleSpaces } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
removeDoubleSpaces('hello  world')
// hello world

removeDoubleSpaces('hello  world  once  again')
// hello world once again
```

## `toHex` - take a string convert it to a hex string

- `value` (required) - Value to convert

Import the library:

```js
const { toHex } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
toHex('hello world')
// 68656c6c6f20776f726c64
```
