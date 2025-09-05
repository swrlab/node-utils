import assert from 'node:assert'
import { describe, it } from 'node:test'
import * as date from '../src/dates/index.ts'

const date2 = 'Fri Sep 05 2025 21:44:37 GMT+0200 (Central European Summer Time)'
const date2date = new Date(date2)
const date2iso = '2025-09-05T19:44:37.000Z'

const testDate = '2038-01-19T03:14:08.000'
const relativeTime = 2147483647000 - Date.now()
const relativeYears = Number.parseInt(relativeTime / (1000 * 60 * 60 * 24 * 365), 10)

describe('Test DateTime Package', () => {
	describe('Test getDateHourMinutes', () => {
		const newFormat = 'Di., 19. Januar 2038 um 03:14'
		const testLegacyResult = 'Di, 19. Januar 2038 - 03:14 Uhr'
		it(`getDateHourMinutes('${testDate}') = '${testLegacyResult}'`, () => {
			assert.equal(date.getDateHourMinutesLegacy(testDate), testLegacyResult)
		})
		it(`getDateHourMinutes('${testDate}') = '${newFormat}'`, () => {
			assert.equal(date.getDateHourMinutes(testDate), newFormat)
		})
	})

	describe('Test getDayMonthYear', () => {
		const newFormat = 'Di., 19. Januar 2038'
		it(`getDayMonthYear('${testDate}') = '${newFormat}'`, () => {
			assert.equal(date.getDayMonthYear(testDate), newFormat)
		})
		const testLegacyFormat = 'Di, 19. Januar 2038'
		it(`getDayMonthYear('${testDate}') = '${testLegacyFormat}'`, () => {
			assert.equal(date.legacy.getDayMonthYear(testDate), testLegacyFormat)
		})
	})

	describe('Test getFullRelativeTime', () => {
		const testResult = `Di, 19. Januar 2038 - 03:14 Uhr (in ${relativeYears} Jahren)`
		it(`getFullRelativeTime('${testDate}') = '${testResult}'`, () => {
			assert.equal(date.getFullRelativeTime(testDate), testResult)
		})
	})

	describe('Test getHourMinutes', () => {
		const testResult = '03:14'
		it(`getHourMinutes('${testDate}') = '${testResult}'`, () => {
			assert.equal(date.getHourMinutes(testDate), testResult)
		})
	})

	describe('Test getIsoRelativeTime', () => {
		const testResult = `${testDate} (in ${relativeYears} Jahren)`
		it(`getIsoRelativeTime('${testDate}') = '${testResult}'`, () => {
			assert.equal(date.getIsoRelativeTime(testDate), testResult)
		})
	})

	describe('Test getRelativeTime', () => {
		const testResult = `in ${relativeYears} Jahren`
		it(`getRelativeTime('${testDate}') = '${testResult}'`, () => {
			assert.equal(date.getRelativeTime(testDate), testResult)
		})
	})

	describe('Test getYearMonthDay', () => {
		const testResult = '20380119'
		it(`getYearMonthDay('${testDate}') = '${testResult}'`, () => {
			assert.equal(date.getYearMonthDay(testDate), testResult)
		})
	})

	describe('Test revYearMonthDay', () => {
		const test = '20380119'
		const testResult = '19012038'
		it(`revYearMonthDay('${test}') = '${testResult}'`, () => {
			assert.equal(date.revYearMonthDay(test), testResult)
		})
	})
})
