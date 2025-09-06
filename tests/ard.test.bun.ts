/**
 * @fileoverview A port of the ard test to bun using bun's `expect` (that behaves like jest).
 * NOTE: This file cannot be run in nodejs, since node does not know `bun:test`.
 */
import { describe, expect, it } from 'bun:test'
import { createHashedId } from '../src/ard/index.ts'

describe('Test ARD Package', () => {
	describe('Test ARD-CoreID Hash', () => {
		it("createHashedId('test') = 0c171b2e54a30c11", () => {
			expect(createHashedId('test')).toEqual('0c171b2e54a30c11')
		})
	})
})
