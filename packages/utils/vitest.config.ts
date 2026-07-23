import { coverageConfigDefaults, defineConfig } from 'vite-plus'

export default defineConfig({
	test: {
		coverage: {
			exclude: [...coverageConfigDefaults.exclude, '**/tsdown.config.ts', '**/bin/*', '**/src/index.ts'],
		},
	},
})
