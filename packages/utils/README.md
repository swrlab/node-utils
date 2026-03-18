# `@swrlab/utils` - Node.js utils from Audio Lab

This repository contains several frequently used packages and scripts for easier access and maintenance.

## Installation

```bash
# using bun:
bun add @swrlab/utils

# or with npm
npm install @swrlab/utils
```

## Features

- ESM-only (-> requires Node.js v20 at least, preferred ^v22.10 or 24.6 and newer)
- TypeScript support
- tree-shakable (thanks to ESM and separte exports)

## Usage

Each utility category (`string`, `date`, etc.) has their own export and thus can be imported individually.

```js
// examples
import { toRelativeTime } from '@swrlab/utils/date'
import { getRandomInRange, roundTo } from '@swrlab/utils/number'
import * as numberUtilities from '@swrlab/utils/number'
```

## Packages

- [ARD](./src/ard) - ARD utilities.
- [Array](./src/array) - Common array utilities.
- [Date](./src/date) - Common date functions and time utilities.
- [Env](./src/env.ts) - Utility to safely work with environment variables (around `process.env`).
- [Helpers](./src/helpers) - Common helper utilities.
- [Number](./src/number) - Common number and math utilities.
- [Object](./src/object) - Common JavaScript object utilities.
- [Predicate](./src/predicate) - Collection of predicate functions, especially useful for TypeScript.
- [Storage Wrapper](./src/storage) - A utility to wrap file access to local, Google Cloud Storage and AWS S3 file storage.
- [String](./src/string) - Common string, array, object encoding and getter utilities.

### ARD Core ID

Import the utility function:

```js
import { createHashedId } from '@swrlab/utils/ard'
```

Then use it to convert a string:

```js
const myString = 'my-string-to-encode'
const hashedString = createHashedId(myString)
// prints: 6a80b80f748c9b50
```

### Array

Import the utility function:

```js
import { arrayToObjectCount, isEmptyArray, notEmptyArray } from '@swrlab/utils/array'
// or (but the approach above is preferred):
import * as array from '@swrlab/utils/array'
```

### Date

Date functions and time helpers.

### Helpers

### bin / scripts

#### ARD Core ID Generator

After installing this package, the command/bin `ard-coreId` is available.

Run ARD CoreId script, to generate a new coreId from an input string:

```sh
# npm's npx
npx --package=@swrlab/utils -c 'ard-coreId hello'

# pnpm
pnpm --package=@swrlab/utils dlx ard-coreId hello

# bun
bunx -p @swrlab/utils ard-coreId hello

# bun (without nodejs-runtime) -> use the `--bun` flag to overwrite runtime.
bunx --bun -p @swrlab/utils ard-coreId hello
```

This will print:

```txt
INPUT:
my-string-to-encode

OUTPUT (CRC64-ECMA182):
6a80b80f748c9b50
```

## Changelog

A separate Changelog is available in [CHANGELOG.md](CHANGELOG.md)

## License

ISC

## Development

### Requirements

This repo is managed with _bun_ as package-manager and TypeScript runtime, however all functionality works in plain Node.js with ESM support as well.

- bun and/or
- node: `>= v24.6` or `^22.18`
