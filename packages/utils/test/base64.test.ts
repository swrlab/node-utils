import { assert, describe, it } from 'vitest'
import { parseBase64, toBase64 } from '../src/string/base64.ts'

describe('toBase64', () => {
	it('should encode an empty string', () => {
		assert.equal(toBase64(''), '')
	})
	it('should encode a string to base64', () => {
		assert.equal(toBase64('123456789'), 'MTIzNDU2Nzg5')
		assert.equal(toBase64('hello'), 'aGVsbG8=')
	})
	it('should throw a TypeError if a number is passed', () => {
		// Node.js version of assert.throws:
		// assert.throws(() => toBase64(undefined), { name: 'TypeError', message: /The first argument/ })
		// @ts-expect-error - undefined won't work, but is fine for testing.
		assert.throws(() => toBase64(undefined), TypeError, /The first argument/)
		// @ts-expect-error - A number won't work, but is fine for testing.
		assert.throws(() => toBase64(123456789), TypeError, 'The first argument must be of type string')
	})
})

describe('parseBase64', () => {
	it('should throw a TypeError on undefined', () => {
		// @ts-expect-error - A number won't work, but is fine for testing.
		assert.throws(() => parseBase64(undefined), TypeError, /The first argument must be of type/)
	})
	it('should decode an empty base64 to an empty string', () => {
		assert.equal(parseBase64(''), '')
	})
	it('should decode base64', () => {
		assert.equal(parseBase64('MTIzNDU2Nzg5'), '123456789')
		assert.equal(parseBase64('SGVsbG8gV29ybGQ='), 'Hello World')
	})
})
