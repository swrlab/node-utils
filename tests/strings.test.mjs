/*

	by SWR Audio Lab
	tests with mocha and chai

*/

// Add eslint exceptions for chai
/* global describe it */

import { expect } from 'chai'
import * as strings from '../packages/strings'

// Test Strings Package
describe('Test Strings Package', () => {
	describe('Test capitalize', () => {
		it("capitalize('a') = 'A'", () => {
			expect(strings.capitalize('a')).to.equal('A')
		})
		it("capitalize('apple') = 'Apple'", () => {
			expect(strings.capitalize('apple')).to.equal('Apple')
		})
	})

	describe('Test getObjectLength', () => {
		it("getObjectLength({ hello: 'world' }) = 1", () => {
			expect(strings.getObjectLength({ hello: 'world' })).to.equal(1)
		})

		it("getObjectLength({ hello: 'world', foo: 'bar' }) = 2", () => {
			expect(
				strings.getObjectLength({
					hello: 'world',
					foo: 'bar',
				})
			).to.equal(2)
		})
	})

	describe('Test isArray', () => {
		it("isArray(['hello world']) = true", () => {
			expect(strings.isArray(['hello world'])).to.equal(true)
		})

		it("isArray({ hello: 'world' }) = false", () => {
			expect(strings.isArray({ hello: 'world' })).to.equal(false)
		})
	})

	describe('Test isEmptyArray', () => {
		it('isEmptyArray([]) = true', () => {
			expect(strings.isEmptyArray([])).to.equal(true)
		})

		it("isEmptyArray(['hello world']) = false", () => {
			expect(strings.isEmptyArray(['hello world'])).to.equal(false)
		})
	})

	describe('Test isEmptyObject', () => {
		it('isEmptyObject({}) = true', () => {
			expect(strings.isEmptyObject({})).to.equal(true)
		})

		it("isEmptyObject({ hello: 'world' }) = false", () => {
			expect(strings.isEmptyObject({ hello: 'world' })).to.equal(false)
		})
	})

	describe('Test isEmptyString', () => {
		it("isEmptyString('') = true", () => {
			expect(strings.isEmptyString('')).to.equal(true)
		})

		it("isEmptyString('hello world') = false", () => {
			expect(strings.isEmptyString('hello world')).to.equal(false)
		})
	})

	describe('Test isIncluded', () => {
		it("isIncluded('hello world', 'hello') = true", () => {
			expect(strings.isIncluded('hello world', 'hello')).to.equal(true)
		})

		it("isIncluded('hello world', 'earth') = false", () => {
			expect(strings.isIncluded('hello world', 'earth')).to.equal(false)
		})
	})

	describe('Test isNull', () => {
		it('isNull(null) = true', () => {
			expect(strings.isNull(null)).to.equal(true)
		})

		it('isNull(undefined) = false', () => {
			expect(strings.isNull(undefined)).to.equal(false)
		})
	})

	describe('Test isObject', () => {
		it("isObject({ hello: 'world' }) = true", () => {
			expect(strings.isObject({ hello: 'world' })).to.equal(true)
		})

		it("isObject('hello world') = false", () => {
			expect(strings.isObject('hello world')).to.equal(false)
		})
	})

	describe('Test isUndefined', () => {
		it('isUndefined(undefined) = true', () => {
			expect(strings.isUndefined(undefined)).to.equal(true)
		})

		it('isUndefined(null) = false', () => {
			expect(strings.isUndefined(null)).to.equal(false)
		})
	})

	describe('Test notEmptyArray', () => {
		it("notEmptyArray(['hello world']) = true", () => {
			expect(strings.notEmptyArray(['hello world'])).to.equal(true)
		})

		it('notEmptyArray([]) = false', () => {
			expect(strings.notEmptyArray([])).to.equal(false)
		})
	})

	describe('Test notEmptyObject', () => {
		it("notEmptyObject({ hello: 'world' }) = true", () => {
			expect(strings.notEmptyObject({ hello: 'world' })).to.equal(true)
		})

		it('notEmptyObject({}) = false', () => {
			expect(strings.notEmptyObject({})).to.equal(false)
		})
	})

	describe('Test notNullOrUndefined', () => {
		it("notNullOrUndefined('hello world') = true", () => {
			expect(strings.notNullOrUndefined('hello world')).to.equal(true)
		})

		it('notNullOrUndefined(null) = false', () => {
			expect(strings.notNullOrUndefined(null)).to.equal(false)
		})

		it('notNullOrUndefined(undefined) = false', () => {
			expect(strings.notNullOrUndefined(undefined)).to.equal(false)
		})
	})

	describe('Test pluralize', () => {
		it("pluralize(1, 'Apple') = '1 Apple'", () => {
			expect(strings.pluralize(1, 'Apple')).to.equal('1 Apple')
		})

		it("pluralize(1000, 'Apple') = '1.000 Apples'", () => {
			expect(strings.pluralize(1000, 'Apple')).to.equal('1.000 Apples')
		})

		it("pluralize(1, 'Child', 'Children') = '1 Child'", () => {
			expect(strings.pluralize(1, 'Child', 'Children')).to.equal('1 Child')
		})

		it("pluralize(1000, 'Child', 'Children') = '1.000 Children'", () => {
			expect(strings.pluralize(1000, 'Child', 'Children')).to.equal('1.000 Children')
		})
	})

	describe('Test removeDoubleSpaces', () => {
		it("removeDoubleSpaces('hello  world')) = 'hello world'", () => {
			expect(strings.removeDoubleSpaces('hello  world')).to.equal('hello world')
		})

		it("removeDoubleSpaces('hello  world  once  again')) = 'hello world once again'", () => {
			expect(strings.removeDoubleSpaces('hello  world  once  again')).to.equal('hello world once again')
		})
	})

	describe('Test toHex', () => {
		it("toHex('hello world')) = '68656c6c6f20776f726c64'", () => {
			expect(strings.toHex('hello world')).to.equal('68656c6c6f20776f726c64')
		})
	})
})
