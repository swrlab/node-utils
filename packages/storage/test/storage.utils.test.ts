import assert from 'node:assert'
import { describe, test } from 'node:test'
import { isCloudStorage, isHttp, isValidUrl } from '../src/utils.ts'

describe('storage utils', () => {
	describe('isHttp protocol', () => {
		test('valid http protocols', () => {
			assert(isHttp('http:'))
			assert(isHttp('https:'))
		})
		test('invalid http protocols', () => {
			// @ts-expect-error - error is ok
			assert.equal(isHttp(''), false)
			// @ts-expect-error - error is ok
			assert(!isHttp('http'))
			// @ts-expect-error - error is ok
			assert(!isHttp('https'))
			// @ts-expect-error - error is ok
			assert(!isHttp('http://'))
			// @ts-expect-error - error is ok
			assert(!isHttp('https://'))
		})
	})

	describe('isCloudStorage protocol', () => {
		test('valid Cloud Storage protocols', () => {
			assert(isCloudStorage('gs:'))
		})
		test('invalid Cloud Storage protocols', () => {
			// @ts-expect-error - error is ok
			assert(!isCloudStorage('gs'))
			// @ts-expect-error - error is ok
			assert(!isCloudStorage('gs:/'))
			assert(!isCloudStorage('http:'))
			assert(!isCloudStorage('https:'))
		})
	})

	describe('isValidUrl', () => {
		test('valid urls', () => {
			assert(isValidUrl('gs://google-storage/test.html'))
			assert(isValidUrl('http://insecure:pass@test.localhost'))
			assert(isValidUrl('https://test.localhost/'))
		})
		test('invalid urls', () => {
			try {
				isValidUrl('gs')
			} catch (error) {
				assert.equal(error.code, 'ERR_INVALID_URL')
			}
		})
		test('invalid stoarge urls', () => {
			assert(!isValidUrl('file:///tmp/test.html'))
			assert(!isValidUrl('sftp://test.html'))
		})
	})
})
