import assert from 'node:assert'
import { describe, test } from 'node:test'
import { createHashedId } from '../src/ard/index.ts'

describe('ard utils', () => {
	test('createHashedId', () => {
		assert.equal(createHashedId('test'), '0c171b2e54a30c11', 'expected hash for the input `test` does not match.')
	})
})
