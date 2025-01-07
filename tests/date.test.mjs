/*

	by SWR Audio Lab
	tests with mocha and chai

*/

// Add eslint exceptions for chai
/* global describe it */

import { expect } from 'chai'
import * as date from '../packages/date'

const testDate = '2038-01-19T03:14:08.000'
const relativeTime = 2147483647000 - new Date().getTime()
const relativeYears = Number.parseInt(relativeTime / (1000 * 60 * 60 * 24 * 365), 10)

// Test DateTime Package
describe('Test DateTime Package', () => {
	describe('Test getDateHourMinutes', () => {
		const testResult = 'Di, 19. Januar 2038 - 03:14 Uhr'
		it(`getDateHourMinutes('${testDate}') = '${testResult}'`, () => {
			expect(date.getDateHourMinutes(testDate)).to.equal(testResult)
		})
	})

	describe('Test getDayMonthYear', () => {
		const testResult = 'Di, 19. Januar 2038'
		it(`getDayMonthYear('${testDate}') = '${testResult}'`, () => {
			expect(date.getDayMonthYear(testDate)).to.equal(testResult)
		})
	})

	describe('Test getFullRelativeTime', () => {
		const testResult = `Di, 19. Januar 2038 - 03:14 Uhr (in ${relativeYears} Jahren)`
		it(`getFullRelativeTime('${testDate}') = '${testResult}'`, () => {
			expect(date.getFullRelativeTime(testDate)).to.equal(testResult)
		})
	})

	describe('Test getHourMinutes', () => {
		const testResult = '03:14'
		it(`getHourMinutes('${testDate}') = '${testResult}'`, () => {
			expect(date.getHourMinutes(testDate)).to.equal(testResult)
		})
	})

	describe('Test getIsoRelativeTime', () => {
		const testResult = `${testDate} (in ${relativeYears} Jahren)`
		it(`getIsoRelativeTime('${testDate}') = '${testResult}'`, () => {
			expect(date.getIsoRelativeTime(testDate)).to.equal(testResult)
		})
	})

	describe('Test getRelativeTime', () => {
		const testResult = `in ${relativeYears} Jahren`
		it(`getRelativeTime('${testDate}') = '${testResult}'`, () => {
			expect(date.getRelativeTime(testDate)).to.equal(testResult)
		})
	})

	describe('Test getYearMonthDay', () => {
		const testResult = '20380119'
		it(`getYearMonthDay('${testDate}') = '${testResult}'`, () => {
			expect(date.getYearMonthDay(testDate)).to.equal(testResult)
		})
	})

	describe('Test revYearMonthDay', () => {
		const test = '20380119'
		const testResult = '19012038'
		it(`revYearMonthDay('${test}') = '${testResult}'`, () => {
			expect(date.revYearMonthDay(test)).to.equal(testResult)
		})
	})
})
