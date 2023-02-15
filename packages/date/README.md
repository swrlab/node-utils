# SWR Audio Lab / Date

Date functions and time helpers.

- [SWR Audio Lab / Date](#swr-audio-lab--date)
  - [Install](#install)
  - [`getDateHourMinutes` - get date with hours and minutes](#getdatehourminutes---get-date-with-hours-and-minutes)
  - [`getDayMonthYear` - get date with month and year](#getdaymonthyear---get-date-with-month-and-year)
  - [`getFullRelativeTime` - get full date with relative years](#getfullrelativetime---get-full-date-with-relative-years)
  - [`getHourMinutes` - get hours and minutes from iso date](#gethourminutes---get-hours-and-minutes-from-iso-date)
  - [`getIsoRelativeTime` - get iso date with relative years](#getisorelativetime---get-iso-date-with-relative-years)
  - [`getRelativeTime` - get relative years from iso date](#getrelativetime---get-relative-years-from-iso-date)
  - [`getYearMonthDay` - get YYYYMMDD from iso date](#getyearmonthday---get-yyyymmdd-from-iso-date)

## Install

Add the parent package to your dependencies:

```sh
yarn add @swrlab/utils
```

## `getDateHourMinutes` - get date with hours and minutes

- `value` (required) - Date as ISO string

Import the library:

```js
const { getDateHourMinutes } = require('@swrlab/utils/packages/date')
```

Then use the toolkit:

```js
getDateHourMinutes('2038-01-19T03:14:08.000')
// 'Di, 19. Januar 2038 - 03:14 Uhr'
```

## `getDayMonthYear` - get date with month and year

- `value` (required) - Date as ISO string

Import the library:

```js
const { getDayMonthYear } = require('@swrlab/utils/packages/date')
```

Then use the toolkit:

```js
getDayMonthYear('2038-01-19T03:14:08.000')
// 'Di, 19. Januar 2038'
```

## `getFullRelativeTime` - get full date with relative years

- `value` (required) - Date as ISO string

Import the library:

```js
const { getFullRelativeTime } = require('@swrlab/utils/packages/date')
```

Then use the toolkit:

```js
getFullRelativeTime('2038-01-19T03:14:08.000')
// 'Di, 19. Januar 2038 - 03:14 Uhr (in YY Jahren)'
```

## `getHourMinutes` - get hours and minutes from iso date

- `value` (required) - Date as ISO string

Import the library:

```js
const { getHourMinutes } = require('@swrlab/utils/packages/date')
```

Then use the toolkit:

```js
getHourMinutes('2038-01-19T03:14:08.000')
// '03:14'
```

## `getIsoRelativeTime` - get iso date with relative years

- `value` (required) - Date as ISO string

Import the library:

```js
const { getIsoRelativeTime } = require('@swrlab/utils/packages/date')
```

Then use the toolkit:

```js
getIsoRelativeTime('2038-01-19T03:14:08.000')
// '2038-01-19T03:14:08.000 (in YY Jahren)'
```

## `getRelativeTime` - get relative years from iso date

- `value` (required) - Date as ISO string

Import the library:

```js
const { getRelativeTime } = require('@swrlab/utils/packages/date')
```

Then use the toolkit:

```js
getRelativeTime('2038-01-19T03:14:08.000')
// '(in YY Jahren)'
```

## `getYearMonthDay` - get YYYYMMDD from iso date

- `value` (required) - Date as ISO string

Import the library:

```js
const { getYearMonthDay } = require('@swrlab/utils/packages/date')
```

Then use the toolkit:

```js
getYearMonthDay('2038-01-19T03:14:08.000')
// '20380119'
```
