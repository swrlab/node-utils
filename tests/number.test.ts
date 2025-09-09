import assert from 'node:assert'
import { describe, it, test } from 'node:test'
import * as number from '../src/number/index.ts'

describe('number utils', () => {
	describe('addLeadingZero', () => {
		it('prepends a zero for one-digit numbers', () => {
			assert.equal(number.addLeadingZero(1), '01')
		})

		it('does not change anything for two-digit numbers', () => {
			assert.equal(number.addLeadingZero(10), '10')
		})
	})

	describe('addTrailingZeros', () => {
		it("addTrailingZeros(1, 5) = '1.00000'", () => {
			assert.equal(number.addTrailingZeros(1, 5), '1.00000')
		})

		it("addTrailingZeros(1.1, 5) = '1.10000'", () => {
			assert.equal(number.addTrailingZeros(1.1, 5), '1.10000')
		})

		it("addTrailingZeros('1.2', 5) = '1.20000'", () => {
			assert.equal(number.addTrailingZeros('1.2', 5), '1.20000')
		})

		it("addTrailingZeros(2, 2, ',') = '2,00'", () => {
			assert.equal(number.addTrailingZeros(2, 2, ','), '2,00')
		})

		it("addTrailingZeros(2.1, 2, ',') = '2,10'", () => {
			assert.equal(number.addTrailingZeros(2.1, 2, ','), '2,10')
		})

		it("addTrailingZeros('2,2', 2, ','') = '2,20'", () => {
			assert.equal(number.addTrailingZeros('2,2', 2, ','), '2,20')
		})
	})

	describe('getAverage', () => {
		it('getAverage([1, 2, 3]) = 2', () => {
			assert.equal(number.getAverage([1, 2, 3]), 2)
		})

		it('getAverage([1.2, 2.4, 3.6], 1) = 2.4', () => {
			assert.equal(number.getAverage([1.2, 2.4, 3.6], 1), 2.4)
		})
	})

	describe('getDiff', () => {
		it('getDiff(2, 1) = 1', () => {
			assert.equal(number.getDiff(2, 1), 1)
		})

		it('getDiff(1, 2) = -1', () => {
			assert.equal(number.getDiff(1, 2), -1)
		})
	})

	describe('getRandomInRange', () => {
		it('getRandomInRange(1, 5) = 1,2,3,4 or 5', () => {
			assert([1, 2, 3, 4, 5].includes(number.getRandomInRange(1, 5)))
		})

		it('getRandomInRange(5, 9) = 5,6,7,8 or 9', () => {
			assert([5, 6, 7, 8, 9].includes(number.getRandomInRange(5, 9)))
		})
	})

	describe('getSum', () => {
		it('getSum([1, 2, 3]) = 6', () => {
			assert.equal(number.getSum([1, 2, 3]), 6)
		})

		it('getSum([1.2, 2.4, 3.6], 1) = 7.2', () => {
			assert.equal(number.getSum([1.2, 2.4, 3.6], 1), 7.2)
		})
	})

	describe('isEven', () => {
		test('even numbers', () => {
			assert(number.isEven(2))
			assert(number.isEven(4))
		})

		test('uneven numbers', () => {
			assert.equal(number.isEven(1), false)
			assert.equal(number.isEven(11), false)
		})
	})

	describe('normalize', () => {
		it('normalize(2, 100) = 0.02', () => {
			assert.equal(number.normalize(2, 100), 0.02)
		})

		it('normalize(80, 100) = 0.8', () => {
			assert.equal(number.normalize(80, 100), 0.8)
		})
	})

	describe('roundTo', () => {
		it('roundTo(1.23456) = 1.23', () => {
			assert.equal(number.roundTo(1.23456), 1.23)
		})

		it('roundTo(1.23456, 4) = 1.2346', () => {
			assert.equal(number.roundTo(1.23456, 4), 1.2346)
		})

		it('roundTo(234.23456, 4) = 234.2346', () => {
			assert.equal(number.roundTo(234.23456, 4), 234.2346)
		})

		it('roundTo(234.2345671, 4) = 234.2346', () => {
			assert.equal(number.roundTo(234.2345671, 4), 234.2346)
		})
		it('roundTo(234.2344671, 3) = 234.234', () => {
			assert.equal(number.roundTo(234.2344671, 3), 234.234)
		})
		it('roundTo(234.2343671, 3) = 234.234', () => {
			assert.equal(number.roundTo(234.2343671, 3), 234.234)
		})
	})

	describe('toReadable', () => {
		it("toReadable(1234567) = '1.234.567'", () => {
			assert.equal(number.toReadable(1234567), '1.234.567')
		})
	})
})
