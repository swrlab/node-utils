const assert = require('node:assert/strict')
const { describe, it } = require('node:test')
const Storage = require('@swrlab/utils-legacy/packages/storage-wrapper')

describe('packages/storage-wrapper cjs', () => {
	it('should create a Storage instance', () => {
		assert(typeof Storage === 'function')
		// should not throw here
		const storage = new Storage({
			gs: {
				projectId: 'my-project-id',
			},
			s3: { region: 'eu-west-1' },
			logging: true,
		})
		assert(typeof storage.createUrl === 'function')
		assert(typeof storage.save === 'function')
	})

	it('should throw for missing google storage config', () => {
		assert.throws(
			() => {
				const _s = new Storage({ gs: null })
			},
			(error) => {
				assert.strictEqual(error.name, 'Error')
				assert.equal(error.message, 'storage config invalid')
				return true
			}
		)
	})
})
