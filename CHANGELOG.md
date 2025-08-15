# SWR Audio Lab / Node.js Utils Changelog

by [**SWR Audio Lab**](https://lab.swr.de/)

## 2025-08-15 - v2.2.0

- refact: remove deprecated `maxRedirections` option from `undici.request`

## 2025-01-07 - v2.1.0

The next major version of this package will remove `@swrlab/utils/packages/date` - please migrate to [`@frytg/dates`](https://jsr.io/@frytg/dates), which is ESM-ready!

- chore: update dependencies (incl. undici to v7.2.0)
- refact: update changelog format
- refact: swap super-linter for repo-specific config
- refact: remove ard category parser

## 2024-11-18 - v2.0.3

- chore: update dependencies

## 2024-10-24 - v2.0.2

- chore: fix node-crc dependency

## 2024-08-05 - v2.0.1

- chore: update dependencies
- chore: update Linter with bun version 'v2'

## 2024-07-10 - v2.0.0

- refact!: remove aws-sdk integration (s3)
- refact!: remove `ard:publishers` and `ard:pub-sort` scripts
- chore!: switch super-linter ESLint config default to `/eslint.config.mjs`

## 2024-05-13 - v1.3.0

- chore: update dependencies
- chore!: upgrade minimum NodeJS version to `v20`

## 2023-12-27 - v1.2.1

- chore: update dependencies
- refact: remove `uuid` dependency
- chore!: upgrade minimum NodeJS version to `v18`

## 2023-12-18 - v1.2.0

- refact: optimize linter util to work with Yarn `>=v4`
- chore: upgrade default NodeJS version to `v20`

## 2023-04-19 - v1.1.3

- fix: don't run linter on dependabot-pr
- fix: use `toReadable` in `pluralize` helper
- security: add safe-to-test flag for pr's

## 2023-02-15 - v1.1.2

- feat: add `revYearMonthDay` to date package
- feat: add `date` package with iso time functions
- feat: add `arrayToObjectCount` to helpers package
- feat: add `getJsonKeys` to helpers package
- feat: add `normalize` to numbers package
- feat: add `isEmptyString` to strings package

## 2023-02-13 - v1.1.1

- feat: add `addTrailingZeros` to numbers package
- feat: add `addLeadingZero` to numbers package
- feat: add `getDiff` to numbers package
- feat: add `getAverage` to numbers package
- feat: add `getSum` to numbers package
- feat: add `getRandomInRange` to numbers package
- feat: add `roundTo` to numbers package

## 2022-12-19 - v1.1.0

- feat: add test workflow to github/actions
- feat: add helpers package (with `sleep` function)
- feat: add numbers package (with `toReadable` function)
- feat: add `capitalize` and `pluralize` functions in strings package
- chore!: move `isEven` from strings to numbers package

BREAKING CHANGE: `strings.isEven()` is deprecated, use `numbers.isEven()` instead

## 2022-08-09 - v1.0.1

- chore: update `super-linter` with new config

## 2022-07-27 - v1.0.0

- chore: move node-crc to swrlab account
- feat: add mocha tests for strings utils

## 2022-07-26 - v1.0.10-beta

- chore: merge `frytg/undici-wrapper` into this package

## 2022-07-06 - v1.0.9-beta

- chore: update undici to v0.1.0 (with fix for `undici.request` instead of `Pool`)

## 2022-06-30 - v1.0.8-beta

- feat: add `isEven` to string helpers

## 2022-06-29 - v1.0.7-beta

- fix: node-crc fork (linux-musl binaries)

## 2022-06-28 - v1.0.6-beta

- feat: mocha test for node-crc
- fix: node-crc fork (prebuild binaries)
- fix: github-actions workflow

## 2022-06-21 - v1.0.5-beta

- chore: update GitHub actions to use latest versions

## 2022-05-03 - v1.0.4-beta

- chore: update GitHub actions

## 2022-03-02 - v1.0.3-beta

- chore: change license to `MIT`
- chore: required Node.js is `v16`

## 2022-01-31 - v1.0.2-beta

- fix: ard publisher script
- add: script for publisher ordering

## 2022-01-31 - v1.0.1-beta

- feat: add string helpers

## 2022-01-26 - v1.0.0-beta

- chore!: folder migration
- refactor: swap node-fetch for undici
- feat: add ard publisher script
- feat: add ard category parser

## 2021-08-11 - v0.2.3

- updated dependencies
- updated GitHub actions
- add optional 'resumable' flag

## 2021-06-21 - v0.2.2

- updated dependencies
- updated GitHub actions
- changed dependabot interval
