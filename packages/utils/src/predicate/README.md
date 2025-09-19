# SWR Audio Lab / Predicate

Common predicate utilities.

- [SWR Audio Lab / Predicate](#swr-audio-lab--predicate)
  - [Install](#install)
  - [`isArray` - check if a value is a proper array](#isarray---check-if-a-value-is-a-proper-array)
  - [`isNull` - check if a value is null](#isnull---check-if-a-value-is-null)
  - [`isObject` - check if a value is a proper object](#isobject---check-if-a-value-is-a-proper-object)
  - [`isUndefined` - check if a value is undefined](#isundefined---check-if-a-value-is-undefined)
  - [`notNullOrUndefined` - check if a value is neither null nor undefined](#notnullorundefined---check-if-a-value-is-neither-null-nor-undefined)

## Install

Add the parent package to your dependencies:

```sh
npm install @swrlab/utils
```

## `isNull` - check if a value is null

- `value` (required) - Value to check

Import the library:

```js
import { isNull } from '@swrlab/utils/predicate'
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
import { isObject } from '@swrlab/utils/predicate'
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
import { isUndefined } from '@swrlab/utils/predicate'
```

Then use the toolkit:

```js
isUndefined(undefined)
// true

isUndefined(null)
// false
```

## `notNullOrUndefined` - check if a value is neither null nor undefined

- `value` (required) - Value to check

Import the library:

```js
import { notNullOrUndefined } from '@swrlab/utils/predicate'
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
