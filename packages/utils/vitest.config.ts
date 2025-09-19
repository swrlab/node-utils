import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			exclude: [...coverageConfigDefaults.exclude, '**/tsdown.config.ts', '**/bin/*', '**/src/index.ts'],
		},
	},
})
