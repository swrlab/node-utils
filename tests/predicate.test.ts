import assert from 'node:assert'
import { describe, it, test } from 'node:test'
import { isArray, isNull, isObject, isPlainObject, isUndefined, notNullOrUndefined } from '../src/predicate/index.ts'

describe('predicate utils', () => {
	describe('isArray', () => {
		it("isArray(['hello world']) = true", () => {
			assert.equal(isArray(['hello world']), true)
		})

		it("isArray({ hello: 'world' }) = false", () => {
			assert.equal(isArray({ hello: 'world' }), false)
		})

		test('valid arrays', () => {
			assert(isArray([]))
			assert(isArray([0]))
			assert(isArray([false]))
		})
		test('non arrays', () => {
			assert(!isArray(true))
			assert(!isArray(false))
			assert(!isArray(''))
			assert(!isArray('[]'))
			assert(!isArray(null))
			assert(!isArray())
			assert(!isArray(undefined))
		})
	})

	describe('isNull', () => {
		test('null returns `true`', () => {
			assert(isNull(null))
		})

		test('non null values all return `false`', () => {
			assert.equal(isNull(undefined), false)
			assert.equal(isNull(''), false)
			assert.equal(isNull(false), false)
			assert.equal(isNull(true), false)
			assert.equal(isNull([]), false)
			assert.equal(isNull('null'), false)
		})
	})

	describe('isObject', () => {
		it("isObject({ hello: 'world' }) = true", () => {
			assert.equal(isObject({ hello: 'world' }), true)
		})

		it("isObject('hello world') = false", () => {
			assert.equal(isObject('hello world'), false)
		})

		it('is true with functions', () => assert(isObject(() => {})))
	})

	describe('isPlainObject', () => {
		it('is true with objects', () => {
			assert(isPlainObject({}))
			assert(isPlainObject(Object.create(null)))
			assert(isPlainObject({ hello: 'world' }))
		})

		it('is false with invalid objects', () => {
			assert.equal(isPlainObject([]), false)
			assert.equal(isPlainObject('hello world'), false)
		})
	})

	describe('isUndefined', () => {
		it('is true for undefined', () => {
			assert(isUndefined(undefined))
		})

		it('is false for null', () => {
			assert.equal(isUndefined(null), false)
		})

		it('is false for false', () => {
			assert.equal(isUndefined(false), false)
		})
	})

	describe('Test notNullOrUndefined', () => {
		it("notNullOrUndefined('hello world') = true", () => {
			assert.equal(notNullOrUndefined('hello world'), true)
		})

		it('notNullOrUndefined(null) = false', () => {
			assert.equal(notNullOrUndefined(null), false)
		})

		it('notNullOrUndefined(undefined) = false', () => {
			assert.equal(notNullOrUndefined(undefined), false)
		})
	})
})
