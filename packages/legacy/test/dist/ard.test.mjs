import { describe, it } from 'node:test'
import { createHashedId } from '../../dist/packages/ard.js'
import { expect } from './utils.mjs'

describe('Test ARD Package', () => {
	describe('Test ARD-CoreID Hash', () => {
		it("createHashedId('test') = 0c171b2e54a30c11", () => {
			expect(createHashedId('test')).toEqual('0c171b2e54a30c11')
		})
	})
})
