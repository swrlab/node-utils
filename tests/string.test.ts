import assert from 'node:assert'
import { describe, it, test } from 'node:test'
import { capitalize, isEmptyString, isIncluded, pluralize, removeDoubleSpaces, toHex } from '../src/string/index.ts'

describe('string utils', () => {
	describe('capitalize', () => {
		test("don't capitalize anything on an empty string", () => {
			assert.equal(capitalize(''), '')
		})
		test('capitalize one letter', () => {
			assert.equal(capitalize('a'), 'A')
		})
		test('capitalize only the first letter', () => {
			assert.equal(capitalize('apple'), 'Apple')
		})
		test('capitalize only the first word', () => {
			assert.equal(capitalize('happy tree friends'), 'Happy tree friends')
		})
	})

	test('isEmptyString', () => {
		assert.equal(isEmptyString(''), true, '`true` was expected for an empty string')
		assert.equal(isEmptyString('hello world'), false, '`false` was expected for a non empty string')
	})

	describe('isIncluded', () => {
		it('returns true if a sub-string is included', () => {
			assert.equal(isIncluded('hello world', 'hello'), true)
		})

		it('returns false if a sub-string is not included', () => {
			assert.equal(isIncluded('hello world', 'earth'), false)
		})
	})

	describe('pluralize', () => {
		it("pluralize(1, 'Apple') = '1 Apple'", () => {
			assert.equal(pluralize(1, 'Apple'), '1 Apple')
		})

		it("pluralize(1000, 'Apple') = '1.000 Apples'", () => {
			assert.equal(pluralize(1000, 'Apple'), '1.000 Apples')
		})

		it("pluralize(1, 'Child', 'Children') = '1 Child'", () => {
			assert.equal(pluralize(1, 'Child', 'Children'), '1 Child')
		})

		it("pluralize(1000, 'Child', 'Children') = '1.000 Children'", () => {
			assert.equal(pluralize(1000, 'Child', 'Children'), '1.000 Children')
		})
	})

	describe('removeDoubleSpaces', () => {
		it("removeDoubleSpaces('hello  world')) = 'hello world'", () => {
			assert.equal(removeDoubleSpaces('hello  world'), 'hello world')
		})

		it("removeDoubleSpaces('hello     world')) = 'hello world'", () => {
			assert.equal(removeDoubleSpaces('hello     world'), 'hello world')
		})

		it("removeDoubleSpaces('hello  world  once  again')) = 'hello world once again'", () => {
			assert.equal(removeDoubleSpaces('hello  world  once  again'), 'hello world once again')
		})

		it('does not remove normal spaces', () => {
			assert.equal(removeDoubleSpaces('hello world'), 'hello world')
			assert.equal(removeDoubleSpaces(' hello world '), ' hello world ')
		})
	})

	test('toHex', () => {
		assert.equal(toHex('hello world'), '68656c6c6f20776f726c64', 'The hex value did not match the expected value.')
	})
})
