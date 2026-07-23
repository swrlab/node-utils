import process from 'node:process'
import { createHashedId } from './createHashedId.ts'

export const coreId = (): void => {
	const [input] = process.argv.slice(2)

	if (!input) {
		console.error('Please provide an input')
		return
	}

	console.info('INPUT:')
	console.info(input)
	console.info(' ')
	console.info('OUTPUT (CRC64-ECMA182):')
	console.info(createHashedId(input))
}

if (import.meta.main) {
	coreId()
}
