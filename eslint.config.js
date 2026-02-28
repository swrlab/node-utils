import { audiolab } from '@swrlab/style-guide/eslint.mjs'

export default audiolab({
	typescript: true,
	prettier: true,
	comments: true,
	jsonc: true,
	markdown: true,
	yaml: true,
})
	.append({
		name: 'markdown/disabled-rules',
		// files: ['**/*.md'],
		rules: {
			'sonarjs/unused-import': 'off',
		},
	})
	.append({
		name: 'jsonc/allow-comments-in-other-tsconfigs',
		files: ['tsconfig.base.json'],
		rules: {
			'jsonc/no-comments': 'off',
		},
	})
	.append({
		name: 'disabled-rules',
		rules: {
			// TODO: figure out how to tell sonarjs eslint that we use asset instead of expect?
			'sonarjs/assertions-in-tests': 'off',
		},
	})
