# SWR Audio Lab / Node.js Utils Changelog

by [**SWR Audio Lab**](https://lab.swr.de/)  

## Changelog

- 2023-02-14 - v1.1.2
  - feat: add `normalize` to numbers package
  - feat: add `isEmptyString` to strings package

- 2023-02-13 - v1.1.1
  - feat: add `addTrailingZeros` to numbers package
  - feat: add `addLeadingZero` to numbers package
  - feat: add `getDiff` to numbers package
  - feat: add `getAverage` to numbers package
  - feat: add `getSum` to numbers package
  - feat: add `getRandomInRange` to numbers package
  - feat: add `roundTo` to numbers package

- 2022-12-19 - v1.1.0
  - feat: add test workflow to github/actions
  - feat: add helpers package (with `sleep` function)
  - feat: add numbers package (with `toReadable` function)
  - feat: add `capitalize` and `pluralize` functions in strings package
  - chore!: move `isEven` from strings to numbers package

  BREAKING CHANGE: `strings.isEven()` is deprecated, use `numbers.isEven()` instead

- 2022-08-09 - v1.0.1
  - chore: update `super-linter` with new config

- 2022-07-27 - v1.0.0
  - chore: move node-crc to swrlab account
  - feat: add mocha tests for strings utils

- 2022-07-26 - v1.0.10-beta
  - chore: merge `frytg/undici-wrapper` into this package

- 2022-07-06 - v1.0.9-beta
  - chore: update undici to v0.1.0 (with fix for `undici.request` instead of `Pool`)

- 2022-06-30 - v1.0.8-beta
  - feat: add `isEven` to string helpers

- 2022-06-29 - v1.0.7-beta
  - fix: node-crc fork (linux-musl binaries)

- 2022-06-28 - v1.0.6-beta
  - feat: mocha test for node-crc
  - fix: node-crc fork (prebuild binaries)
  - fix: github-actions workflow

- 2022-06-21 - v1.0.5-beta
  - chore: update GitHub actions to use latest versions

- 2022-05-03 - v1.0.4-beta
  - chore: update GitHub actions

- 2022-03-02 - v1.0.3-beta
  - chore: change license to `MIT`
  - chore: required Node.js is `v16`

- 2022-01-31 - v1.0.2-beta
  - fix: ard publisher script
  - add: script for publisher ordering

- 2022-01-31 - v1.0.1-beta
  - feat: add string helpers

- 2022-01-26 - v1.0.0-beta
  - chore!: folder migration
  - refactor: swap node-fetch for undici
  - feat: add ard publisher script
  - feat: add ard category parser

- 2021-08-11 - v0.2.3
  - updated dependencies
  - updated GitHub actions
  - add optional 'resumable' flag

- 2021-06-21 - v0.2.2
  - updated dependencies
  - updated GitHub actions
  - changed dependabot interval
