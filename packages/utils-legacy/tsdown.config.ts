import { defineConfig } from 'tsdown'

export default defineConfig({
	deps: {
		alwaysBundle: ['@swrlab/storage'],
	},
	entry: {
		index: 'src/index.ts',
		'packages/*': 'src/*.ts',
	},
	format: ['cjs', 'esm'],
})
