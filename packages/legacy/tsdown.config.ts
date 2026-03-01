import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: {
		'packages/*': 'src/*.ts',
	},
})
