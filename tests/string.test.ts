import assert from 'node:assert'
import { describe, it, test } from 'node:test'
import * as strings from '../src/string/index.ts'
import { capitalize } from '../src/string/index.ts'

describe('Test Strings Package', () => {
	describe('Test capitalize', () => {
		it("capitalize('a') = 'A'", () => {
			assert.equal(capitalize('a'), 'A')
		})
		it("capitalize('apple') = 'Apple'", () => {
			assert.equal(capitalize('apple'), 'Apple')
		})
	})

	describe('Test getObjectLength', () => {
		it("getObjectLength({ hello: 'world' }) = 1", () => {
			assert.equal(strings.getObjectLength({ hello: 'world' }), 1)
		})

		it("getObjectLength({ hello: 'world', foo: 'bar' }) = 2", () => {
			assert.equal(
				strings.getObjectLength({
					hello: 'world',
					foo: 'bar',
				}),
				2
			)
		})
	})

	describe('Test isArray', () => {
		it("isArray(['hello world']) = true", () => {
			assert.equal(strings.isArray(['hello world']), true)
		})

		it("isArray({ hello: 'world' }) = false", () => {
			assert.equal(strings.isArray({ hello: 'world' }), false)
		})

		test('valid arrays', () => {
			assert(strings.isArray([]))
			assert(strings.isArray([0]))
			assert(strings.isArray([false]))
		})
		test('non arrays', () => {
			assert(!strings.isArray(true))
			assert(!strings.isArray(false))
			assert(!strings.isArray(''))
			assert(!strings.isArray('[]'))
			assert(!strings.isArray(null))
			assert(!strings.isArray())
			assert(!strings.isArray(undefined))
		})
	})

	describe('Test isEmptyArray', () => {
		it('isEmptyArray([]) = true', () => {
			assert.equal(strings.isEmptyArray([]), true)
		})

		it("isEmptyArray(['hello world']) = false", () => {
			assert.equal(strings.isEmptyArray(['hello world']), false)
		})
	})

	describe('Test isEmptyObject', () => {
		it('isEmptyObject({}) = true', () => {
			assert.equal(strings.isEmptyObject({}), true)
		})

		it("isEmptyObject({ hello: 'world' }) = false", () => {
			assert.equal(strings.isEmptyObject({ hello: 'world' }), false)
		})
	})

	describe('Test isEmptyString', () => {
		it("isEmptyString('') = true", () => {
			assert.equal(strings.isEmptyString(''), true)
		})

		it("isEmptyString('hello world') = false", () => {
			assert.equal(strings.isEmptyString('hello world'), false)
		})
	})

	describe('Test isIncluded', () => {
		it("isIncluded('hello world', 'hello') = true", () => {
			assert.equal(strings.isIncluded('hello world', 'hello'), true)
		})

		it("isIncluded('hello world', 'earth') = false", () => {
			assert.equal(strings.isIncluded('hello world', 'earth'), false)
		})
	})

	describe('Test isNull', () => {
		it('isNull(null) = true', () => {
			assert.equal(strings.isNull(null), true)
		})

		it('isNull(undefined) = false', () => {
			assert.equal(strings.isNull(undefined), false)
		})
	})

	describe('Test isObject', () => {
		it("isObject({ hello: 'world' }) = true", () => {
			assert.equal(strings.isObject({ hello: 'world' }), true)
		})

		it("isObject('hello world') = false", () => {
			assert.equal(strings.isObject('hello world'), false)
		})
	})

	describe('Test isPlainObject', () => {
		it('is true with objects', () => {
			assert(strings.isPlainObject({}))
			assert(strings.isPlainObject(Object.create(null)))
			assert(strings.isPlainObject({ hello: 'world' }))
		})

		it('is false with invalid objects', () => {
			assert.equal(strings.isPlainObject([]), false)
			assert.equal(strings.isPlainObject('hello world'), false)
		})
	})

	describe('Test isUndefined', () => {
		it('isUndefined(undefined) = true', () => {
			assert.equal(strings.isUndefined(undefined), true)
		})

		it('isUndefined(null) = false', () => {
			assert.equal(strings.isUndefined(null), false)
		})

		it('isUndefined(false) = false', () => {
			assert.equal(strings.isUndefined(false), false)
		})
	})

	describe('Test notEmptyArray', () => {
		it("notEmptyArray(['hello world']) = true", () => {
			assert.equal(strings.notEmptyArray(['hello world']), true)
		})

		it('notEmptyArray([]) = false', () => {
			assert.equal(strings.notEmptyArray([]), false)
		})
	})

	describe('Test notEmptyObject', () => {
		it("notEmptyObject({ hello: 'world' }) = true", () => {
			assert.equal(strings.notEmptyObject({ hello: 'world' }), true)
		})

		it('notEmptyObject({}) = false', () => {
			assert.equal(strings.notEmptyObject({}), false)
		})
	})

	describe('Test notNullOrUndefined', () => {
		it("notNullOrUndefined('hello world') = true", () => {
			assert.equal(strings.notNullOrUndefined('hello world'), true)
		})

		it('notNullOrUndefined(null) = false', () => {
			assert.equal(strings.notNullOrUndefined(null), false)
		})

		it('notNullOrUndefined(undefined) = false', () => {
			assert.equal(strings.notNullOrUndefined(undefined), false)
		})
	})

	describe('Test pluralize', () => {
		it("pluralize(1, 'Apple') = '1 Apple'", () => {
			assert.equal(strings.pluralize(1, 'Apple'), '1 Apple')
		})

		it("pluralize(1000, 'Apple') = '1.000 Apples'", () => {
			assert.equal(strings.pluralize(1000, 'Apple'), '1.000 Apples')
		})

		it("pluralize(1, 'Child', 'Children') = '1 Child'", () => {
			assert.equal(strings.pluralize(1, 'Child', 'Children'), '1 Child')
		})

		it("pluralize(1000, 'Child', 'Children') = '1.000 Children'", () => {
			assert.equal(strings.pluralize(1000, 'Child', 'Children'), '1.000 Children')
		})
	})

	describe('Test removeDoubleSpaces', () => {
		it("removeDoubleSpaces('hello  world')) = 'hello world'", () => {
			assert.equal(strings.removeDoubleSpaces('hello  world'), 'hello world')
		})

		it("removeDoubleSpaces('hello     world')) = 'hello world'", () => {
			assert.equal(strings.removeDoubleSpaces('hello     world'), 'hello world')
		})

		it("removeDoubleSpaces('hello  world  once  again')) = 'hello world once again'", () => {
			assert.equal(strings.removeDoubleSpaces('hello  world  once  again'), 'hello world once again')
		})

		it('does not remove normal spaces', () => {
			assert.equal(strings.removeDoubleSpaces('hello world'), 'hello world')
			assert.equal(strings.removeDoubleSpaces(' hello world '), ' hello world ')
		})
	})

	describe('Test toHex', () => {
		it("toHex('hello world')) = '68656c6c6f20776f726c64'", () => {
			assert.equal(strings.toHex('hello world'), '68656c6c6f20776f726c64')
		})
	})
})
