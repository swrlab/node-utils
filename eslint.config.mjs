import { audiolab } from '@swrlab/style-guide/eslint.js'

export default audiolab(
	{
		prettier: false,
		comments: true,
	},
	[
		{
			ignores: [],
		},
		{
			files: ['./packages/**/*.js', './utils/**/*.js'],
			name: 'node-utils/disabled-rules',
			rules: {
				'unicorn/prefer-string-slice': 'off',
				'perfectionist/sort-imports': 'off',
				'unicorn/prefer-string-replace-all': 'off',
				'node/prefer-global/buffer': 'off',
				'@eslint-community/eslint-comments/require-description': 'off',
				'jsonc/sort-keys': 'off',
				'no-console': 'off',
				'node/prefer-global/process': 'off',
				'prefer-template': 'off',
				'require-await': 'off',
				'security/detect-non-literal-fs-filename': 'off',
				'security/detect-non-literal-regexp': 'off',
				'security/detect-object-injection': 'off',
				'sonarjs/no-ignored-exceptions': 'off',
				'sonarjs/os-command': 'off',
				'sonarjs/pseudo-random': 'off',
				'sonarjs/slow-regex': 'off',
				'unicorn/no-instanceof-builtins': 'off',
				'unicorn/prefer-date-now': 'off',
				'unicorn/prefer-includes': 'off',
				'unicorn/prefer-optional-catch-binding': 'off',
				'unicorn/prefer-prototype-methods': 'off',
				'unused-imports/no-unused-vars': 'off',
			},
		},
	]
)
