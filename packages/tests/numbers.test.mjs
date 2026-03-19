import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
// import * as numbers from '../../dist/packages/numbers.mjs'
import * as numbers from '@swrlab/utils-legacy/packages/numbers'

describe('Test Numbers Package', () => {
	describe('Test addLeadingZero', () => {
		it("addLeadingZero(1) = '01'", () => {
			assert.equal(numbers.addLeadingZero(1), '01')
		})

		it("addLeadingZero(10) = '10'", () => {
			assert.equal(numbers.addLeadingZero(10), '10')
		})
	})

	describe('Test addTrailingZeros', () => {
		it("addTrailingZeros(1, 5) = '1.00000'", () => {
			assert.equal(numbers.addTrailingZeros(1, 5), '1.00000')
		})

		it("addTrailingZeros(1.1, 5) = '1.10000'", () => {
			assert.equal(numbers.addTrailingZeros(1.1, 5), '1.10000')
		})

		it("addTrailingZeros('1.2', 5) = '1.20000'", () => {
			assert.equal(numbers.addTrailingZeros('1.2', 5), '1.20000')
		})

		it("addTrailingZeros(2, 2, ',') = '2,00'", () => {
			assert.equal(numbers.addTrailingZeros(2, 2, ','), '2,00')
		})

		it("addTrailingZeros(2.1, 2, ',') = '2,10'", () => {
			assert.equal(numbers.addTrailingZeros(2.1, 2, ','), '2,10')
		})

		it("addTrailingZeros('2,2', 2, ','') = '2,20'", () => {
			assert.equal(numbers.addTrailingZeros('2,2', 2, ','), '2,20')
		})
	})

	describe('Test getAverage', () => {
		it('getAverage([1, 2, 3]) = 2', () => {
			assert.equal(numbers.getAverage([1, 2, 3]), 2)
		})

		it('getAverage([1.2, 2.4, 3.6], 1) = 2.4', () => {
			assert.equal(numbers.getAverage([1.2, 2.4, 3.6], 1), 2.4)
		})
	})

	describe('Test getDiff', () => {
		it('getDiff(2, 1) = 1', () => {
			assert.equal(numbers.getDiff(2, 1), 1)
		})

		it('getDiff(1, 2) = -1', () => {
			assert.equal(numbers.getDiff(1, 2), -1)
		})
	})

	describe('Test getRandomInRange', () => {
		it('getRandomInRange(1, 5) = 1,2,3,4 or 5', () => {
			assert.ok([1, 2, 3, 4, 5].includes(numbers.getRandomInRange(1, 5)))
		})

		it('getRandomInRange(5, 9) = 5,6,7,8 or 9', () => {
			assert.ok([5, 6, 7, 8, 9].includes(numbers.getRandomInRange(5, 9)))
		})
	})

	describe('Test getSum', () => {
		it('getSum([1, 2, 3]) = 6', () => {
			assert.equal(numbers.getSum([1, 2, 3]), 6)
		})

		it('getSum([1.2, 2.4, 3.6], 1) = 7.2', () => {
			assert.equal(numbers.getSum([1.2, 2.4, 3.6], 1), 7.2)
		})
	})

	describe('Test isEven', () => {
		it('isEven(2) = true', () => {
			assert.equal(numbers.isEven(2), true)
		})

		it('isEven(1) = false', () => {
			assert.equal(numbers.isEven(1), false)
		})
	})

	describe('Test normalize', () => {
		it('normalize(2, 100) = 0.02', () => {
			assert.equal(numbers.normalize(2, 100), 0.02)
		})

		it('normalize(80, 100) = 0.8', () => {
			assert.equal(numbers.normalize(80, 100), 0.8)
		})
	})

	describe('Test roundTo', () => {
		it('roundTo(1.23456) = 1.23', () => {
			assert.equal(numbers.roundTo(1.23456), 1.23)
		})

		it('roundTo(1.23456, 4) = 1.2346', () => {
			assert.equal(numbers.roundTo(1.23456, 4), 1.2346)
		})
	})

	describe('Test toReadable', () => {
		it("toReadable(1234567) = '1.234.567'", () => {
			assert.equal(numbers.toReadable(1234567), '1.234.567')
		})
	})
})
