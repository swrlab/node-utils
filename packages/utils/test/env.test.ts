import { afterAll as after, assert, beforeAll as before, describe, it } from 'vitest'
import { getEnv, getEnvBase64, getEnvBoolean, getEnvString, MissingEnvVarError } from './../src/env.ts'

describe('no env values available', () => {
	it('should throw an error for missing required values', () => {
		// Node.js version of assert
		// assert.throws(() => getEnv<string>('MISSING', { type: 'string', required: true }), { name: 'MissingEnvVarError', })
		assert.throws(() => getEnv<string>('MISSING', { type: 'string', required: true }), MissingEnvVarError)
	})
	it('should throw an error for missing required values (even with defaultValue)', () => {
		assert.throws(
			() => getEnv<string>('MISSING', { type: 'string', required: true, defaultValue: 'hi' }),
			MissingEnvVarError
		)
	})
	it('should return the defaultValue for optional values', () => {
		assert.equal(getEnv<string>('MISSING', { type: 'string', required: false, defaultValue: 'def' }), 'def')
	})
	describe('functions with `required` set to `true` by default', () => {
		it('should throw an error for getEnvString when the value is missing', () => {
			assert.throws(() => getEnvString('MISSING'), MissingEnvVarError)
		})
		it('should throw an error for getEnvBase64 when the value is missing', () => {
			assert.throws(() => getEnvBase64('MISSING'), MissingEnvVarError)
		})
	})
	describe('functions with `required` set to `false` by default', () => {
		it('should return `undefined` for a missing boolean value', () => {
			assert.equal(getEnvBoolean('MISSING'), undefined)
		})
		it('should return `undefined` for a missing general/string value', () => {
			assert.equal(getEnv('MISSING'), undefined)
		})
	})
})

describe('mocked env values', () => {
	const mocked: Record<PropertyKey, string> = {
		FOO: 'BAR',
		BASE64: 'eyJkdHMiOnRydWV9',
		BASE64_BROKEN: 'asdf',
		EMPTY_JSON: '',
		BROKEN_JSON: '{ "asdf"',
	} as const

	before(() => {
		// set mocked env values for env.ts
		globalThis.__VitestMockEnv = mocked
	})
	after(() => {
		// clean up
		globalThis.__VitestMockEnv = undefined
	})
	it('should throw an error for missing required values', () => {
		assert.throws(() => getEnv<string>('MISSING', { type: 'string', required: true }), MissingEnvVarError)
	})
	it('should return the mocked exsiting value', () => {
		assert.deepEqual(getEnv<string>('FOO', { type: 'string', required: true }), mocked.FOO)
	})
	describe('getEnvBase64', () => {
		it('should have the value', () => {
			const value = getEnvBase64('BASE64')
			assert.deepEqual(value, { dts: true })
		})
		it('should throw a SyntaxError for invalid json data', () => {
			assert.throws(() => getEnvBase64('BASE64_BROKEN'), /SyntaxError:.*Unexpected/)
			assert.throws(() => getEnvBase64('BASE64_BROKEN'), /variable BASE64_BROKEN as/)
		})
	})
	describe('getEnvJSON', () => {
		it('should throw a SyntaxError for an empty value', () => {
			assert.throws(() => getEnvBase64('EMPTY_JSON'), /EMPTY_JSON.*SyntaxError: /)
		})
		it('should throw a SyntaxError for mal-formed json', () => {
			assert.throws(() => getEnvBase64('BROKEN_JSON'), /SyntaxError:.*Unexpected/)
		})
	})
})
