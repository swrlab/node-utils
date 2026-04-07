import { defineConfig } from 'vite-plus'

export default defineConfig({
	pack: {
		deps: {
			alwaysBundle: ['@swrlab/storage', '@swrlab/utils'],
		},
		entry: {
			index: 'src/index.ts',
			'packages/*': 'src/*.ts',
		},
		format: ['cjs', 'esm'],
		target: ['esnext', 'firefox148'],
		attw: {
			profile: 'esm-only',
		},
		publint: true,
	},
})
