/*

	by SWR Audio Lab
	tests with mocha and chai

*/

import { expect } from 'chai'
import { createHashedId } from '../packages/ard'

// Test ARD Package
describe('Test ARD Package', () => {
	describe('Test ARD-CoreID Hash', () => {
		it("createHashedId('test') = 0c171b2e54a30c11", () => {
			expect(createHashedId('test')).to.equal('0c171b2e54a30c11')
		})
	})
})
