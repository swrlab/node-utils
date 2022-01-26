# SWR Audio Lab / Strings, Arrays, Objects

Common string, array, object encoding and getter helpers.

- [SWR Audio Lab / Strings, Arrays, Objects](#swr-audio-lab--strings-arrays-objects)
  - [Install](#install)
  - [`isArray` - Check if a value is a proper array](#isarray---check-if-a-value-is-a-proper-array)
  - [`isEmptyArray` - Check if a value is an empty array](#isemptyarray---check-if-a-value-is-an-empty-array)
  - [`isEmptyObject` - Check if a value is an empty object](#isemptyobject---check-if-a-value-is-an-empty-object)
  - [`isIncluded` - Check if a value (haystack) includes another value (needle)](#isincluded---check-if-a-value-haystack-includes-another-value-needle)
  - [`isNull` - Check if a value is null](#isnull---check-if-a-value-is-null)
  - [`isObject` - check if a value is a proper object](#isobject---check-if-a-value-is-a-proper-object)
  - [`isUndefined` - Check if a value is undefined](#isundefined---check-if-a-value-is-undefined)
  - [`notEmptyArray` - Check if a value is not an empty array](#notemptyarray---check-if-a-value-is-not-an-empty-array)
  - [`notEmptyObject` - Check if a value is not an empty object](#notemptyobject---check-if-a-value-is-not-an-empty-object)
  - [`notNullOrUndefined` - Check if a value is neither null nor undefined](#notnullorundefined---check-if-a-value-is-neither-null-nor-undefined)
  - [`removeDoubleSpaces` - take a string and remove its duplicate spaces](#removedoublespaces---take-a-string-and-remove-its-duplicate-spaces)
  - [`toHex` - take a string convert it to a hex string](#tohex---take-a-string-convert-it-to-a-hex-string)

## Install

Add the parent package to your dependencies:

```sh
yarn add @swrlab/utils
```

## `isArray` - Check if a value is a proper array

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

## `isEmptyArray` - Check if a value is an empty array

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

## `isEmptyObject` - Check if a value is an empty object

- `value` (required) - Value to check

Import the library:

```js
const { isEmptyObject } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
isEmptyObject({})
// true

isEmptyObject({hello: 'world'})
// false
```

## `isIncluded` - Check if a value (haystack) includes another value (needle)

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

## `isNull` - Check if a value is null

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

## `isUndefined` - Check if a value is undefined

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

## `notEmptyArray` - Check if a value is not an empty array

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

## `notEmptyObject` - Check if a value is not an empty object

- `value` (required) - Value to check

Import the library:

```js
const { notEmptyObject } = require('@swrlab/utils/packages/strings')
```

Then use the toolkit:

```js
notEmptyObject({hello: 'world'})
// true

notEmptyObject({})
// false
```

## `notNullOrUndefined` - Check if a value is neither null nor undefined

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
