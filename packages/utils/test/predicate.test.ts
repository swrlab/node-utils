import { assert, describe, it } from 'vite-plus/test'
import { isArray, isNull, isObject, isPlainObject, isUndefined, notNullOrUndefined } from '../src/predicate/index.ts'

describe('predicate utils', () => {
	describe('isArray', () => {
		it('should return true for an array with one element in it', () => {
			assert.equal(isArray(['hello world']), true)
		})

		it('should return false when passing an object', () => {
			assert.equal(isArray({ hello: 'world' }), false)
		})

		it('should return true for any array', () => {
			assert(isArray([]))
			assert(isArray([0]))
			assert(isArray([false]))
		})
		it('should return false for all non-array values', () => {
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
		it('should return `true` for null', () => {
			assert(isNull(null))
		})

		it('should return `false` for non-null values', () => {
			assert.equal(isNull(undefined), false)
			assert.equal(isNull(''), false)
			assert.equal(isNull(false), false)
			assert.equal(isNull(true), false)
			assert.equal(isNull([]), false)
			assert.equal(isNull('null'), false)
		})
	})

	describe('isObject', () => {
		it('should return true for an object', () => {
			assert.equal(isObject({ hello: 'world' }), true)
		})

		it('should return false for non-objects like strings', () => {
			assert.equal(isObject('hello world'), false)
			assert.equal(isObject(123), false)
			assert.equal(isObject(true), false)
		})

		it('should return true for functions as value', () => assert(isObject(() => {})))
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
		it('should return true for strings and numbers', () => {
			assert.equal(notNullOrUndefined('hello world'), true)
			assert.equal(notNullOrUndefined(123), true)
		})

		it('should return true booleans', () => {
			assert.equal(notNullOrUndefined(true), true)
			assert.equal(notNullOrUndefined(false), true)
		})

		it('should return false when passing null', () => {
			assert.equal(notNullOrUndefined(null), false)
		})

		it('should return false when passing undefined', () => {
			assert.equal(notNullOrUndefined(undefined), false)
			// oxlint-disable-next-line no-unassigned-vars -- we create a test case
			let undefVar: unknown
			assert.equal(notNullOrUndefined(undefVar), false)
		})
	})
})
