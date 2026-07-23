/**
 * @module
 * Utilities to re-create functions like `expect` from vitest/jest/chai to use `node:assert/strict` underneath.
 */

import assert, { equal } from 'node:assert/strict'

export const expect = (a) => ({
	// chai
	to: {
		equal: (b) => equal(a, b),
		include: (needle) => assert(a.includes(needle)),
		be: {
			greaterThanOrEqual: (b) => a >= b,
		},
	},
	// jest / bun
	toEqual: (b) => equal(a, b),
})

export const isBun = () => typeof globalThis.Bun !== 'undefined'
