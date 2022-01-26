# SWR Audio Lab / Strings, Arrays, Objects

Common string, array, object encoding and getter helpers.

- [SWR Audio Lab / Strings, Arrays, Objects](#swr-audio-lab--strings-arrays-objects)
  - [Install](#install)
  - [`isArray` - Check if a value is a proper array](#isarray---check-if-a-value-is-a-proper-array)
  - [`isIncluded` - Check if a value (haystack) includes another value (needle)](#isincluded---check-if-a-value-haystack-includes-another-value-needle)
  - [`isObject` - check if a value is a proper object](#isobject---check-if-a-value-is-a-proper-object)
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
