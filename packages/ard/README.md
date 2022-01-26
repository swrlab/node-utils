# SWR Audio Lab / ARD helpers

Common internal ARD tools like ID creation.

- [SWR Audio Lab / ARD helpers](#swr-audio-lab--ard-helpers)
  - [Install](#install)
  - [`createHashedId` - Convert a string to ARD's hash style](#createhashedid---convert-a-string-to-ards-hash-style)

## Install

Add the parent package to your dependencies:

```sh
yarn add @swrlab/utils
```

## `createHashedId` - Convert a string to ARD's hash style

- `string` (required) - value to encode

Import the library:

```js
const ardTools = require('@swrlab/utils/packages/ard')
```

Then use the toolkit to convert a string:

```js
const myString = 'my-string-to-encode'
const hashedString = ard.createHashedId(myString)
// 6a80b80f748c9b50
```
