import { defineConfig } from 'tsdown'

export default defineConfig({
	deps: {
		alwaysBundle: ['@swrlab/storage', '@swrlab/utils'],
	},
	entry: {
		index: 'src/index.ts',
		'packages/*': 'src/*.ts',
	},
	format: ['cjs', 'esm'],
})
