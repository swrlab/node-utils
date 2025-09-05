/**
 * @fileoverview A port of the ard test to bun using bun's `expect` (that behaves like jest).
 */
import { describe, expect, it } from 'bun:test'
import { createHashedId } from '../packages/ard/index.js'

describe('Test ARD Package', () => {
	describe('Test ARD-CoreID Hash', () => {
		it("createHashedId('test') = 0c171b2e54a30c11", () => {
			expect(createHashedId('test')).toEqual('0c171b2e54a30c11')
		})
	})
})
