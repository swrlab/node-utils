import assert from 'node:assert'
import { describe, it, test } from 'node:test'
import { getJsonKeys, getObjectLength, isEmptyObject, notEmptyObject } from '../src/object/index.ts'

describe('object utils', () => {
	describe('getObjectLength', () => {
		test('empty object', () => {
			assert.strictEqual(getObjectLength({}), 0, 'empty objects should have a length of zero.')
		})

		test('object with one key', () => {
			assert.strictEqual(getObjectLength({ hello: 'world' }), 1)
		})

		test('obect with two keys', () => {
			assert.equal(
				getObjectLength({
					hello: 'world',
					foo: 'bar',
				}),
				2
			)
		})
		test('obect with nested object', () => {
			assert.equal(
				getObjectLength({
					hello: 'world',
					foo: { bar: 2, baz: 4, boo: 5 },
				}),
				2
			)
		})
	})

	test('getJsonKeys', () => {
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

	describe('isEmptyObject', () => {
		it('is `true` for an empty object', () => {
			assert.equal(isEmptyObject({}), true)
		})

		it('is `false` for a non-empty object', () => {
			assert.equal(isEmptyObject({ hello: 'world' }), false)
		})
	})

	describe('notEmptyObject', () => {
		test('non empty objects return `true`', () => {
			assert.equal(notEmptyObject({ hello: 'world' }), true, 'a non-empty object must be true')
		})

		test('empty objects', () => {
			assert.equal(notEmptyObject({}), false, 'non empty objects must be false')
		})

		it('is `false` for non-objects', () => {
			// @ts-expect-error for testing `false` is alright
			assert.equal(notEmptyObject(false), false)
			assert.equal(notEmptyObject([]), false)
			assert.equal(notEmptyObject(['hello']), false)
			assert.equal(notEmptyObject(Object.create(null)), false)
		})
	})
})
