/*

	by SWR audio lab

    simple tests with mocha and chai

*/

// Add eslint exceptions for chai
/* global describe it */

const { expect } = require('chai')
const createHashedId = require('../utils/ard/createHashedId')

describe('Test ARD-CoreID', () => {
	it('createHashedId test', () => {
		expect(createHashedId('test')).to.equal('0c171b2e54a30c11')
	})
})
