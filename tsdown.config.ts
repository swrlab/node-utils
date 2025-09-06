import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		ard: 'src/ard/index.ts',
		dates: 'src/date/index.ts',
		string: 'src/string/index.ts',
		number: 'src/number/index.ts',
	},
})
