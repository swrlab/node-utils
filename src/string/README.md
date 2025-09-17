# SWR Audio Lab / Strings, Arrays, Objects

Common string, array, object encoding and getter helpers.

- [SWR Audio Lab / String](#swr-audio-lab--string)
  - [Install](#install)
  - [`base64` - get capitalized string](#base64)
  - [`capitalize` - get capitalized string](#capitalize---get-capitalized-string)
  - [`crc64` - get capitalized string](#crc64)
  - [`isEmptyString` - check if a value is an empty string](#isemptystring---check-if-a-value-is-an-empty-string)
  - [`isIncluded` - Deprecated: check if a value (haystack) includes another value (needle)](#isincluded---check-if-a-value-haystack-includes-another-value-needle)
  - [`pluralize` - get pluralized string](#pluralize---get-pluralized-string)
  - [`removeDoubleSpaces` - take a string and remove its duplicate spaces](#removedoublespaces---take-a-string-and-remove-its-duplicate-spaces)
  - [`toHex` - take a string convert it to a hex string](#tohex---take-a-string-convert-it-to-a-hex-string)

## Install

Add the parent package to your dependencies:

```sh
npm add @swrlab/utils
```

## `toBase64`, `parseBase64` - decode and encode base64

- `value` (required) - String to capitalize

Import the library:

```js
import { toBase64, parseBase64 } from ('@swrlab/utils/string')
```

Then use the toolkit:

```js
toBase64('123456789')
// prints: MTIzNDU2Nzg5

parseBase64('MTIzNDU2Nzg5')
// prints: 123456789
```

## `capitalize` - get capitalized string

- `value` (required) - String to capitalize

Import the library:

```js
import { capitalize } from ('@swrlab/utils/string')
```

Then use the toolkit:

```js
capitalize('apple')
// Apple
```

## `crc64` - get the crc64 ECMA-182 checksum of a string

- `value` (required) - Value to convert

Import the library:

```js
import { crc64 } from '@swrlab/utils/string'
```

Then use the toolkit:

```js
crc64('123456789')
// 6c40df5f0b497347
```

## `isEmptyString` - check if a value is an empty string

- `value` (required) - Value to check

Import the library:

```js
import { isEmptyString } from '@swrlab/utils/string'
```

Then use the toolkit:

```js
isEmptyString('')
// true

isEmptyString('hello world')
// false
```

## Deprecated: `isIncluded` - check if a value (haystack) includes another value (needle)

> ![NOTE]
> Use the native `stringOrArray.includes(needle)` instead.

- `haystack` (required) - Array or value to check
- `needle` (required) - Array or value to check

## `pluralize` - get pluralized string

- `value` (required) - String to pluralize

Import the library:

```js
import { pluralize } from '@swrlab/utils/string'
```

Then use the toolkit:

```js
pluralize(1, 'Apple')
// 1 Apple

pluralize(1000, 'Apple')
// 1.000 Apples

pluralize(1, 'Child', 'Children')
// 1 Child

pluralize(1000, 'Child', 'Children')
// 1.000 Children
```

## `removeDoubleSpaces` - take a string and remove its duplicate spaces

- `value` (required) - String to convert

Import the library:

```js
import { removeDoubleSpaces } from '@swrlab/utils/string'
```

Then use the toolkit:

```js
removeDoubleSpaces('hello  world')
// hello world

removeDoubleSpaces('hello  world  once  again')
// hello world once again
```

## `toHex` - take a string convert it to a hex string

- `value` (required) - String to convert

Import the library:

```js
import { toHex } from '@swrlab/utils/string'
```

Then use the toolkit:

```js
toHex('hello world')
// 68656c6c6f20776f726c64
```
