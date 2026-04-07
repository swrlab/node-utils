import { defineConfig } from 'vite-plus'

export default defineConfig({
	pack: {
		entry: {
			index: 'src/index.ts',

			ard: 'src/ard/index.ts',
			'ard-coreId': 'src/ard/coreId.ts',

			array: 'src/array/index.ts',
			env: 'src/env.ts',
			helper: 'src/helpers/index.ts',
			number: 'src/number/index.ts',
			object: 'src/object/index.ts',
			predicate: 'src/predicate/index.ts',
			string: 'src/string/index.ts',
		},
		// attw does not work with `publishConfig`, so it cannot find all types.
		// attw: { profile: 'esm-only', },
		publint: true,
	},
})
