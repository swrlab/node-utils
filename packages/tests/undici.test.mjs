import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isBun } from './utils.mjs'

describe('packages/undici mts', () => {
	it('should be a function', async () => {
		const { default: undici } = await import('@swrlab/utils-legacy/packages/undici')
		assert(typeof undici === 'function')
	})

	it('should be a function', async () => {
		const undi = await import('@swrlab/utils-legacy/packages/undici')
		assert(typeof undi === 'object')
		assert(typeof undi.default === 'function')
	})

	if (isBun()) {
		it('should use require too', () => {
			const undici = require('@swrlab/utils-legacy/packages/undici')
			assert(typeof undici === 'function')
			assert(typeof undici.default === 'undefined')
		})
	}

	it('should fail', () => {
		assert.rejects(
			async () => {
				const _undi = await import('@swrlab/utils-legacy/packages/undici.mjs') //.catch((e) => console.error('err', e))
			},
			(err) => {
				const name = isBun() ? 'ResolveMessage' : 'Error'
				assert.strictEqual(err.name, name)
				assert(err.message.startsWith('Cannot find module'))
				assert(err.message.includes('packages/undici.mjs'))
				return true
			}
		)
	})
})
