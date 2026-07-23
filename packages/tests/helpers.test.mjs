import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import * as helpers from '@swrlab/utils-legacy/packages/helpers'

describe('Test Helpers Package', () => {
	describe('Test arrayToObjectCount', () => {
		it("arrayToObjectCount(['foo', 'bar', 'bar']) = { bar: 2, foo: 1 }", () => {
			const test = ['foo', 'bar', 'bar']
			const result = { bar: 2, foo: 1 }
			const testResult = helpers.arrayToObjectCount(test)
			assert.equal(testResult.bar, result.bar)
			assert.equal(testResult.foo, result.foo)
		})
	})

	describe('Test getJsonKeys', () => {
		it("getJsonKeys({ hello: 'world', foo: 'bar' }) = ['hello', 'foo']", () => {
			const test = { hello: 'world', foo: 'bar' }
			const result = ['hello', 'foo']
			const testResult = helpers.getJsonKeys(test)
			assert.equal(testResult[0], result[0])
			assert.equal(testResult[1], result[1])
		})
	})

	describe('Test sleep', () => {
		it('sleep(1e3) will sleep 1s', async () => {
			const time = 20
			const before = Date.now()
			await helpers.sleep(time)
			const after = Date.now()
			assert.ok(after - before >= time - 1)
		})
	})
})
