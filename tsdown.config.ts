import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: {
		index: 'src/index.ts',

		ard: 'src/ard/index.ts',
		array: 'src/array/index.ts',
		date: 'src/date/index.ts',
		helpers: 'src/helpers/index.ts',
		number: 'src/number/index.ts',
		object: 'src/object/index.ts',
		predicate: 'src/predicate/index.ts',
		storage: 'src/storage/index.ts',
		string: 'src/string/index.ts',

		// legacy
		'packages/ard': './src/legacy/ard.ts',
		'packages/date': './src/legacy/date.ts',
		'packages/helpers': './src/legacy/helpers.ts',
		'packages/numbers': './src/legacy/numbers.ts',
		'packages/storage-wrapper': './src/legacy/storage-wrapper.ts',
		'packages/strings': './src/legacy/strings.ts',
		'packages/undici': './src/legacy/undici.ts',
	},
})
