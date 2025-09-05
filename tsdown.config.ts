import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		ard: 'src/ard/index.ts',
		dates: 'src/dates/index.ts',
	},
})
