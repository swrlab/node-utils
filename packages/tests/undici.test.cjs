const assert = require('node:assert/strict')
const { describe, it } = require('node:test')
const { isBun } = require('./utils.mjs')

describe('packages/undici cjs', () => {
	it('should have a default export', () => {
		const undici = require('@swrlab/utils-legacy/packages/undici')
		assert(typeof undici === 'function')
		assert(typeof undici.default === 'undefined')
	})

	it('should be a function when imported', async () => {
		const { default: undici } = await import('@swrlab/utils-legacy/packages/undici')
		assert(typeof undici === 'function')
	})

	it('should fail for wrong extensions', () => {
		assert.throws(
			() => {
				const _undi = require('@swrlab/utils-legacy/packages/undici.mjs')
			},
			(error) => {
				const name = isBun() ? 'ResolveMessage' : 'Error'
				assert.strictEqual(error.name, name)
				assert(error.message.startsWith('Cannot find module'))
				assert(error.message.includes('packages/undici.mjs'))
				return true
			}
		)
	})

	it('should fail for wrong extensions', () => {
		assert.throws(
			() => {
				const _undi = require('@swrlab/utils-legacy/packages/undici.cjs')
			},
			(error) => {
				const name = isBun() ? 'ResolveMessage' : 'Error'
				assert.strictEqual(error.name, name)
				assert(error.message.startsWith('Cannot find module'))
				assert(error.message.includes('packages/undici.cjs'))
				return true
			}
		)
	})
})
