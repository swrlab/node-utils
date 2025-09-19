import { assert, describe, test } from 'vitest'
import { arrayToObjectCount, isEmptyArray, notEmptyArray } from '../src/array/index.ts'

describe('array utilities', () => {
	test('arrayToObjectCount', () => {
		const test = ['foo', 'bar', 'bar']
		const result = { bar: 2, foo: 1 }
		const testResult = arrayToObjectCount(test)
		assert.equal(testResult.bar, result.bar)
		assert.equal(testResult.foo, result.foo)
	})

	describe('isEmptyArray', () => {
		test('an empty array', () => {
			assert(isEmptyArray([]))
		})

		test('non-empty array', () => {
			assert.equal(isEmptyArray(['hello world']), false)
		})
	})

	test('notEmptyArray', () => {
		assert(notEmptyArray(['hello world']), '`true` was expected for a non-empty array')
		assert(!notEmptyArray([]), '`false` was expected for an empty array.')
	})
})
