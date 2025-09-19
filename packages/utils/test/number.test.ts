import { assert, describe, it } from 'vitest'
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

	describe('Number.toFixed', () => {
		it("toFixed(1, 5) = '1.00000'", () => {
			assert.equal((1).toFixed(5), '1.00000')
		})
		it("1.1.toFixed(5) = '1.10000'", () => {
			assert.equal((1.1).toFixed(5), '1.10000')
		})
		it("toFixed('1.2', 5) = '1.20000'", () => {
			assert.strictEqual((1.2).toFixed(5), '1.20000')
		})
	})

	describe('Number.toLocaleString minimumFractionDigits', () => {
		it("1.toFixed(5) = '1,00000'", () => {
			assert.strictEqual((1).toLocaleString('en'), '1')
			assert.strictEqual((1).toLocaleString('de'), '1')
			assert.strictEqual((1).toLocaleString('es'), '1')
			assert.strictEqual((2.5).toLocaleString('en'), '2.5')
			assert.strictEqual((2.5).toLocaleString('de'), '2,5')
			assert.strictEqual((2.5).toLocaleString('de-DE'), '2,5')
			assert.strictEqual(
				(1).toLocaleString('en-US', { minimumFractionDigits: 5, maximumFractionDigits: 5 }),
				'1.00000'
			)
			assert.strictEqual(
				(1).toLocaleString('de-DE', { minimumFractionDigits: 5, maximumFractionDigits: 5 }),
				'1,00000'
			)
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

	describe('getAverage (legacy method)', () => {
		it('should return the average as Integer if possible', () => {
			assert.equal(number.getAverage([1, 2, 3]), 2)
		})

		it('should return the average as float', () => {
			assert.equal(number.getAverage([1.2, 2.4, 3.6], 1), 2.4)
		})

		it('should round the inputs', () => {
			// here is the rounding behaviour different (it happens before already)
			assert.equal(number.getAverage([1.22, 2.44, 3.66], 2), 2.44)
			assert.equal(number.getAverage([1.22, 2.44, 3.66], 1), 2.433333333333333)
			assert.equal(number.getAverage([1.45, 2.44, 3.66], 1), 2.5)
		})
	})

	describe('average', () => {
		it('should return the average as Integer if possible', () => {
			assert.equal(number.average([1, 2, 3]), 2)
		})

		it('should return the average as float', () => {
			assert.equal(number.average([1.2, 2.4, 3.6], 1), 2.4)
		})

		it('should round the result only', () => {
			assert.equal(number.average([1.22, 2.44, 3.66], 2), 2.44)
			assert.equal(number.average([1.22, 2.44, 3.66], 1), 2.4)
			assert.equal(number.average([1.45, 2.44, 3.66], 1), 2.5)
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
		it('should calculate the sum of integers', () => {
			assert.equal(number.getSum([1, 2, 3]), 6)
		})

		it('should calculate the sum of floats', () => {
			assert.equal(number.getSum([1.2, 2.4, 3.6], 1), 7.2)
		})

		it('should round the input', () => {
			assert.equal(number.getSum([1.5, 2.5, 3.6], 1), 7.6)
			assert.equal(number.getSum([1.5, 2.5, 3.6], 0), 9)
			assert.equal(number.getSum([2.46, 4.46, 8.46], 2), 15.38)
			assert.equal(number.getSum([2.46, 4.46, 8.46], 1), 15.5)
			assert.equal(number.getSum([2.46, 4.46, 8.46], 0), 14)
		})
	})
	describe('sum', () => {
		it('should calculate the sum of integers', () => {
			assert.equal(number.sum([1, 2, 3]), 6)
		})

		it('should calculate the sum of floats', () => {
			assert.equal(number.sum([1.2, 2.4, 3.6], 1), 7.2)
		})

		it('should round afterwards', () => {
			assert.equal(number.sum([1.5, 2.5, 3.6], 1), 7.6)
			assert.equal(number.sum([1.5, 2.5, 3.6], 0), 8)
			assert.equal(number.sum([2.46, 4.46, 8.46], 2), 15.38)
			assert.equal(number.sum([2.46, 4.46, 8.46], 1), 15.4)
			assert.equal(number.sum([2.46, 4.46, 8.46], 0), 15)
		})
	})

	describe('isEven', () => {
		it('is true for even numbers', () => {
			assert(number.isEven(2))
			assert(number.isEven(4))
		})

		it('is false for uneven numbers', () => {
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
