const assert = require('node:assert/strict')
const { describe, test } = require('node:test')
const ard = require('@swrlab/utils-legacy/packages/ard')
const date = require('@swrlab/utils-legacy/packages/date')
const numbers = require('@swrlab/utils-legacy/packages/numbers')
const strings = require('@swrlab/utils-legacy/packages/strings')

describe('mostUsed cjs', () => {
	describe('ard', () => {
		test('createHashedId', () => {
			assert(ard)
			assert.equal(ard.createHashedId('hello'), '40544a306137b6ec')
			const { createHashedId } = require('@swrlab/utils-legacy/packages/ard')
			assert.equal(createHashedId('hello'), '40544a306137b6ec')
		})
	})

	describe('date', () => {
		test('getDateHourMinutes', () => {
			assert(date)
			assert(date.getDateHourMinutes(new Date().toISOString()))
			const { getDateHourMinutes } = require('@swrlab/utils-legacy/packages/date')
			assert(getDateHourMinutes(new Date().toISOString()))
		})

		test('getYearMonthDay', () => {
			assert(date.getYearMonthDay(new Date().toISOString()))
			const { getYearMonthDay } = require('@swrlab/utils-legacy/packages/date')
			assert(getYearMonthDay(new Date().toISOString()))
		})
	})

	describe('numbers', () => {
		test('toReadable', () => {
			assert(numbers)
			assert.equal(numbers.toReadable(1234), '1.234')
			const { toReadable } = require('@swrlab/utils-legacy/packages/numbers')
			assert.equal(toReadable(1234), '1.234')
		})

		test('toReadable has no single file export', () => {
			assert.throws(() => require('@swrlab/utils-legacy/packages/numbers/toReadable'))
		})
	})

	describe('strings', () => {
		test('isIncluded', () => {
			assert(strings)
			assert(strings.isIncluded('hello', 'hell'))
			const { isIncluded } = require('@swrlab/utils-legacy/packages/strings')
			assert(isIncluded('guten Morgen', 'Morgen'))
			assert(!isIncluded('guten morgen', 'Morgen'))
			assert(!isIncluded('guten Morgen', 'Abend'))
		})

		test('isEmptyArray', () => {
			assert(strings.isEmptyArray([]))
			const { isEmptyArray } = require('@swrlab/utils-legacy/packages/strings')
			assert(isEmptyArray([]))
			assert(!isEmptyArray([0]))
		})
	})
})
