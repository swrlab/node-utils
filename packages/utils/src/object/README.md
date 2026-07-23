# SWR Audio Lab / Object

Common string, array, object encoding and getter helpers.

- [SWR Audio Lab / Object](#swr-audio-lab--object)
  - [Install](#install)
  - [`getJsonKeys` - get all keys of json input](#getjsonkeys---get-all-keys-of-json-input)
  - [`getObjectLength` - get the length of an object](#getobjectlength---get-the-length-of-an-object)
  - [`isEmptyObject` - check if a value is an empty object](#isemptyobject---check-if-a-value-is-an-empty-object)
  - [`notEmptyObject` - check if a value is not an empty object](#notemptyobject---check-if-a-value-is-not-an-empty-object)

## Install

Add the parent package to your dependencies:

```sh
npm install @swrlab/utils
```

## `getJsonKeys` - get all keys of json input

- `value` (required) - Json to get keys from

Import the library:

```js
import { getJsonKeys } from '@swrlab/utils/object'
```

Then use the toolkit:

```js
getJsonKeys({ hello: 'world', foo: 'bar' })
// ['hello', 'foo']
```

## `getObjectLength` - get the length of an object

- `value` (required) - Value to check

Import the library:

```js
import { getObjectLength } from '@swrlab/utils/object'
```

Then use the toolkit:

```js
getObjectLength({ hello: 'world' })
// 1

getObjectLength({ hello: 'world', foo: 'bar' })
// 2
```

## `isEmptyObject` - check if a value is an empty object

- `value` (required) - Value to check

Import the library:

```js
import { isEmptyObject } from '@swrlab/utils/object'
```

Then use the toolkit:

```js
isEmptyObject({})
// true

isEmptyObject({ hello: 'world' })
// false
```

## `notEmptyObject` - check if a value is not an empty object

- `value` (required) - Value to check

Import the library:

```js
import { notEmptyObject } from '@swrlab/utils/object'
```

Then use the toolkit:

```js
notEmptyObject({ hello: 'world' })
// true

notEmptyObject({})
// false
```
