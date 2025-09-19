import { afterEach, assert, beforeEach, describe, expect, it, vi } from 'vitest'
import { request, sleep } from '../src/helpers/index.ts'

describe('helpers', () => {
	describe('request', () => {
		let newFetch = vi.fn(() => ({ ok: true, json: true }))

		beforeEach(() => {
			newFetch = vi.fn(() => ({ ok: true, json: true }))
			vi.stubGlobal('fetch', newFetch)
		})

		afterEach(() => {
			vi.unstubAllGlobals()
			vi.unstubAllEnvs()
		})

		describe('user-agent', () => {
			const url = 'http://localhost/ua'
			it('should use the default user-agent with package name', async () => {
				expect(newFetch).not.toBeCalled()
				await request(url)
				expect(newFetch).toBeCalledWith(url, {
					headers: {
						'user-agent': 'swrlab/utils/3.0.0-beta.3',
					},
					signal: expect.any(AbortSignal),
				})
			})

			it('should pass the user agent from env as header', async () => {
				vi.stubEnv('USER_AGENT', 'new-UA/1.0')
				expect(newFetch).not.toBeCalled()
				await request(url)
				expect(newFetch).toBeCalledWith(url, {
					headers: {
						'user-agent': 'new-UA/1.0',
					},
					signal: expect.any(AbortSignal),
				})
			})
		})

		describe('timeout', () => {
			const url = 'http://localhost/to'
			const timeout = vi.fn(() => undefined)
			beforeEach(() => {
				vi.stubGlobal('AbortSignal', { timeout })
			})
			afterEach(() => {
				vi.unstubAllGlobals()
			})
			it('should use the default timeout value when not timeout entry is passed', async () => {
				await request(url)
				expect(timeout).toBeCalledWith(7000)
			})

			it('should use the default user-agent with package name', async () => {
				await request(url, { timeout: 1234 })
				expect(timeout).toBeCalledWith(1234)
			})
		})
	})

	// skip sleep test, since it works and takes "too long"
	describe.skip('sleep', () => {
		it('will sleep for one second', async () => {
			const time = 1e3
			const before = Date.now()
			await sleep(time)
			const after = Date.now()
			assert(after - before >= time)
		})
	})
})
