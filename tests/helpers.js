/*

	by SWR audio lab
	simple tests with mocha and chai

*/

// Add eslint exceptions for chai
/* global describe it */

const { expect } = require('chai')
const helpers = require('../packages/helpers')

// Test Helpers Package
describe('Test Helpers Package', () => {
	describe('Test arrayToObjectCount', () => {
		it("arrayToObjectCount(['foo', 'bar', 'bar']) = { bar: 2, foo: 1 }", () => {
			const test = ['foo', 'bar', 'bar']
			const result = { bar: 2, foo: 1 }
			const testResult = helpers.arrayToObjectCount(test)
			expect(testResult.bar).to.equal(result.bar)
			expect(testResult.foo).to.equal(result.foo)
		})
	})

	describe('Test getJsonKeys', () => {
		it("getJsonKeys({ hello: 'world', foo: 'bar' }) = ['hello', 'foo']", () => {
			const test = { hello: 'world', foo: 'bar' }
			const result = ['hello', 'foo']
			const testResult = helpers.getJsonKeys(test)
			expect(testResult[0]).to.equal(result[0])
			expect(testResult[1]).to.equal(result[1])
		})
	})

	describe('Test sleep', () => {
		it('sleep(1e3) will sleep 1s', async () => {
			const time = 1e3
			const before = Date.now()
			await helpers.sleep(time)
			const after = Date.now()
			expect(after - before).to.be.greaterThanOrEqual(time)
		})
	})
})
