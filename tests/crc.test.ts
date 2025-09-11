import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { describe, test } from 'node:test'
import { crc64, crc64String } from '../src/string/crc64.ts'

// Standard check string for CRC algorithms
const stdInput = '123456789'
const stdExpected = '6c40df5f0b497347' // official ECMA-182 check

describe('CRC-64 string', () => {
	test('CRC-64/ECMA known check value', () => {
		assert.equal(crc64String(stdInput), stdExpected)
	})

	test('Empty string gives zero CRC', () => {
		assert.equal(crc64String(''), '0000000000000000')
	})

	test('Single character', () => {
		assert.equal(crc64String('a'), '548f120162451c62')
	})

	test('Different strings produce different CRCs', () => {
		const c1 = crc64String('hello')
		const c2 = crc64String('world')
		assert.notEqual(c1, c2)
	})

	test('Deterministic: same input, same output', () => {
		const s = 'functional crc test'
		const c1 = crc64String(s)
		const c2 = crc64String(s)
		assert.equal(c1, c2)
	})

	describe('more tests', () => {
		test('test (core-id)', () => {
			// NOTE: This is the example from the ARD Core-Id test/example.
			assert.equal(crc64String('test'), '0c171b2e54a30c11')
		})

		test('Hello', () => {
			assert.equal(crc64String('Hello'), 'ffad3236b47900ab')
		})

		test('hello world', () => {
			assert.equal(crc64String('hello world'), '12511f272d9bc22a')
		})
	})
})

describe('CRC-64 raw', () => {
	test('test (core-id)', () => {
		// NOTE: here is no leading `0` filled in (since the CRC checksum is one char shorter.)
		assert.equal(crc64(Buffer.from('test', 'utf-8')).toString(16), 'c171b2e54a30c11')
		assert.equal(crc64(Buffer.from('test', 'utf-8')), 871194938721897489n)
	})

	test('standard test', () => {
		assert.equal(crc64(Buffer.from(stdInput, 'utf-8')), 7800480153909949255n)
		assert.equal(crc64(Buffer.from(stdInput, 'utf-8')).toString(16), stdExpected)
	})

	test('empty string', () => {
		const checksum = crc64(Buffer.from('', 'utf-8'))
		assert.equal(checksum, 0n)
		assert.equal(checksum.toString(16), '0')
		assert.equal(checksum.toString(), '0')
	})
})
