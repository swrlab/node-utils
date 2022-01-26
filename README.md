# SWR Audio Lab / Node Utils

This repository contains several frequently used packages and scripts for easier access and maintenance.

*Please note: This project is still under development!*  

- [SWR Audio Lab / Node Utils](#swr-audio-lab--node-utils)
  - [Install](#install)
  - [Packages](#packages)
    - [Storage Wrapper](#storage-wrapper)
    - [Undici](#undici)
  - [Scripts](#scripts)
    - [ARD Category Remapper](#ard-category-remapper)
    - [ARD Core ID generator](#ard-core-id-generator)
    - [ARD Core Publisher Remapper](#ard-core-publisher-remapper)
  - [Changelog](#changelog)
  - [License](#license)

## Install

Packages are meant to be imported into other projects:

```js
const undici = require('@swrlab/utils/undici')
```

Scripts are meant to be run locally, therefore clone the repository and first install dependencies. We prefer `yarn` for this:

```sh
yarn install
```

Then run the desired script.

## Packages

### [Storage Wrapper](./packages/storage-wrapper)

A utility to wrap file access to local, Google Cloud Storage and AWS S3 file storage.

### [Undici](./packages/undici)

Provides the latest install of [`undici-wrapper`](https://github.com/frytg/undici-wrapper), a wrapper around the [`undici`](https://undici.nodejs.org/) HTTP library.

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

## Changelog

A separate Changelog is available in [CHANGELOG.md](CHANGELOG.md)

## License

See [LICENSE.md](LICENSE.md)
