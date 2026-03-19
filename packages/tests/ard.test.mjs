import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createHashedId } from '@swrlab/utils-legacy/packages/ard'

describe('Test ARD Package', () => {
	describe('Test ARD-CoreID Hash', () => {
		it("createHashedId('test') = 0c171b2e54a30c11", () => {
			assert.equal(createHashedId('test'), '0c171b2e54a30c11')
		})
	})
})
