/*

	by SWR Audio Lab
	tests with mocha and chai

*/

// Add eslint exceptions for chai
/* global describe it */

const { expect } = require('chai')
const numbers = require('../packages/numbers')

// Test Numbers Package
describe('Test Numbers Package', () => {
	describe('Test addLeadingZero', () => {
		it("addLeadingZero(1) = '01'", () => {
			expect(numbers.addLeadingZero(1)).to.equal('01')
		})

		it("addLeadingZero(10) = '10'", () => {
			expect(numbers.addLeadingZero(10)).to.equal('10')
		})
	})

	describe('Test addTrailingZeros', () => {
		it("addTrailingZeros(1, 5) = '1.00000'", () => {
			expect(numbers.addTrailingZeros(1, 5)).to.equal(
				'1.00000'
			)
		})

		it("addTrailingZeros(1.1, 5) = '1.10000'", () => {
			expect(numbers.addTrailingZeros(1.1, 5)).to.equal(
				'1.10000'
			)
		})

		it("addTrailingZeros('1.2', 5) = '1.20000'", () => {
			expect(numbers.addTrailingZeros('1.2', 5)).to.equal(
				'1.20000'
			)
		})

		it("addTrailingZeros(2, 2, ',') = '2,00'", () => {
			expect(numbers.addTrailingZeros(2, 2, ',')).to.equal(
				'2,00'
			)
		})

		it("addTrailingZeros(2.1, 2, ',') = '2,10'", () => {
			expect(numbers.addTrailingZeros(2.1, 2, ',')).to.equal(
				'2,10'
			)
		})

		it("addTrailingZeros('2,2', 2, ','') = '2,20'", () => {
			expect(
				numbers.addTrailingZeros('2,2', 2, ',')
			).to.equal('2,20')
		})
	})

	describe('Test getAverage', () => {
		it('getAverage([1, 2, 3]) = 2', () => {
			expect(numbers.getAverage([1, 2, 3])).to.equal(2)
		})

		it('getAverage([1.2, 2.4, 3.6], 1) = 2.4', () => {
			expect(numbers.getAverage([1.2, 2.4, 3.6], 1)).to.equal(
				2.4
			)
		})
	})

	describe('Test getDiff', () => {
		it('getDiff(2, 1) = 1', () => {
			expect(numbers.getDiff(2, 1)).to.equal(1)
		})

		it('getDiff(1, 2) = -1', () => {
			expect(numbers.getDiff(1, 2)).to.equal(-1)
		})
	})

	describe('Test getRandomInRange', () => {
		it('getRandomInRange(1, 5) = 1,2,3,4 or 5', () => {
			expect([1, 2, 3, 4, 5]).to.include(
				numbers.getRandomInRange(1, 5)
			)
		})

		it('getRandomInRange(5, 9) = 5,6,7,8 or 9', () => {
			expect([5, 6, 7, 8, 9]).to.include(
				numbers.getRandomInRange(5, 9)
			)
		})
	})

	describe('Test getSum', () => {
		it('getSum([1, 2, 3]) = 6', () => {
			expect(numbers.getSum([1, 2, 3])).to.equal(6)
		})

		it('getSum([1.2, 2.4, 3.6], 1) = 7.2', () => {
			expect(numbers.getSum([1.2, 2.4, 3.6], 1)).to.equal(7.2)
		})
	})

	describe('Test isEven', () => {
		it('isEven(2) = true', () => {
			expect(numbers.isEven(2)).to.equal(true)
		})

		it('isEven(1) = false', () => {
			expect(numbers.isEven(1)).to.equal(false)
		})
	})

	describe('Test normalize', () => {
		it('normalize(2, 100) = 0.02', () => {
			expect(numbers.normalize(2, 100)).to.equal(0.02)
		})

		it('normalize(80, 100) = 0.8', () => {
			expect(numbers.normalize(80, 100)).to.equal(0.8)
		})
	})

	describe('Test roundTo', () => {
		it('roundTo(1.23456) = 1.23', () => {
			expect(numbers.roundTo(1.23456)).to.equal(1.23)
		})

		it('roundTo(1.23456, 4) = 1.2346', () => {
			expect(numbers.roundTo(1.23456, 4)).to.equal(1.2346)
		})
	})

	describe('Test toReadable', () => {
		it("toReadable(1234567) = '1.234.567'", () => {
			expect(numbers.toReadable(1234567)).to.equal(
				'1.234.567'
			)
		})
	})
})
