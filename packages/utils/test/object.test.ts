import { assert, describe, it } from 'vite-plus/test'
import { getJsonKeys, getObjectLength, isEmptyObject, notEmptyObject } from '../src/object/index.ts'

describe('object utils', () => {
	describe('getObjectLength', () => {
		it('should return 0 for empty object', () => {
			assert.strictEqual(getObjectLength({}), 0, 'empty objects should have a length of zero.')
		})

		it('should return 1 for an object with one entry', () => {
			assert.strictEqual(getObjectLength({ hello: 'world' }), 1)
		})

		it('should return 2 for an object with two entries', () => {
			assert.equal(
				getObjectLength({
					hello: 'world',
					foo: 'bar',
				}),
				2
			)
		})
		it('should return 2 for a nested object that has two top entries', () => {
			assert.equal(
				getObjectLength({
					hello: 'world',
					foo: { bar: 2, baz: 4, boo: 5 },
				}),
				2
			)
		})
	})

	describe('getJsonKeys', () => {
		it('should return the keys of an object', () => {
			const test = { hello: 'world', foo: 'bar' }
			const result = ['hello', 'foo']
			const testResult = getJsonKeys(test)
			assert.equal(testResult[0], result[0])
			assert.equal(testResult[1], result[1])
			// just using `Object.keys`
			const testResultSimple = Object.keys(test)
			assert.equal(testResultSimple[0], result[0])
			assert.equal(testResultSimple[1], result[1])
		})
	})

	describe('isEmptyObject', () => {
		it('is `true` for an empty object', () => {
			assert.equal(isEmptyObject({}), true)
		})

		it('is `false` for a non-empty object', () => {
			assert.equal(isEmptyObject({ hello: 'world' }), false)
		})
	})

	describe('notEmptyObject', () => {
		it('should return true for non empty objects', () => {
			assert.equal(notEmptyObject({ hello: 'world' }), true, 'a non-empty object must be true')
		})

		it('should return false for an empty object', () => {
			assert.equal(notEmptyObject({}), false, 'non empty objects must be false')
		})

		it('should return false for non-objects', () => {
			// @ts-expect-error for testing `false` is alright
			assert.equal(notEmptyObject(false), false)
			assert.equal(notEmptyObject([]), false)
			assert.equal(notEmptyObject(['hello']), false)
			assert.equal(notEmptyObject(Object.create(null)), false)
		})
	})
})
