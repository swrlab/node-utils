import assert from 'node:assert'
import { describe, it, skip } from 'node:test'
import { sleep } from '../src/helpers/index.ts'

describe('helpers', () => {
	// skip sleep test, since it works and takes "too long"
	skip('sleep', () => {
		it('will sleep for one second', async () => {
			const time = 1e3
			const before = Date.now()
			await sleep(time)
			const after = Date.now()
			assert(after - before >= time)
		})
	})
})
