# SWR Audio Lab / Node.js Utils

This repository contains several frequently used packages and scripts for easier access and maintenance.

## Install

Packages are meant to be imported into other projects:

```js
const undici = require('@swrlab/utils/packages/undici')
```

Scripts are meant to be run locally, therefore clone the repository and first install dependencies. We prefer `yarn` for this:

```sh
yarn add @swrlab/utils
```

Then run the desired script.

## Packages

- [ARD](./packages/ard) - Common internal ARD tools like ID creation
- [Date](./packages/date) - Common date functions and time helpers
- [Helpers](./packages/helpers) - Common functions and helpers
- [Numbers](./packages/numbers) - Common number and math helpers
- [Storage Wrapper](./packages/storage-wrapper) - A utility to wrap file access to local, Google Cloud Storage and AWS S3 file storage
- [Strings](./packages/strings) - Common string, array, object encoding and getter helpers
- [Undici](./packages/undici) - Provides the latest install of [`undici-wrapper`](https://github.com/frytg/undici-wrapper), a wrapper around the [`undici`](https://undici.nodejs.org/) HTTP library

## Scripts

### ARD Category Remapper

Use the publicly available ARD categories and reformat them into our structure:

```sh
yarn ard:categories
```

The output is written to a file: [`data/ard/categories.json`](./data/ard/categories.json) (also kept in state in this repository).

### ARD Core ID generator

A CLI to encode strings into the ARD Core ID standard:

```sh
yarn ard:coreId "my-string-to-encode"
```

This will print:

```txt
INPUT:
my-string-to-encode

OUTPUT (CRC64-ECMA182):
6a80b80f748c9b50
```

### ARD Core Publisher Remapper

Download all publishers and remap them into our format:

```sh
yarn ard:publishers
```

The output is written to a file: `tmp/ard-publishers.json` (the state is not in this repository, but likely still in [`ard-eventhub/.../coreApi.json`](https://github.com/swrlab/ard-eventhub/blob/main/src/data/coreApi.json)).

## Publish to npm

Sign in to npm and provide username, password, and email-address:

```sh
npm login
```

Publish updates of this package with:

```sh
npm publish
```

## Changelog

A separate Changelog is available in [CHANGELOG.md](CHANGELOG.md)

## License

See [LICENSE.txt](LICENSE.txt)
