import { audiolab } from '@swrlab/style-guide/eslint/presets'

export default audiolab(
	[
		{
			ignores: [],
		},
		{
			rules: {
				'n/no-missing-import': 'off',
				'n/no-path-concat': 'off',
				// 'vue/no-unused-component': 'off',
				'vue/no-unused-components': 'off',
				'n/no-unsupported-features/node-builtins': 'off',
				'n/no-missing-require': 'off',
				'no-unused-vars': 'off',
				eqeqeq: 'off',
				'no-undef': 'off',
				// 'prefer-const': 'off',
				'import/no-extraneous-dependencies': 'off',
				'n/no-extraneous-require': 'off',

				'vue/no-deprecated-destroyed-lifecycle': 'off',
				'prefer-template': 'off',
				'sonarjs/cognitive-complexity': 'off',

				// fixable
				'one-var': 'off',
				'prefer-const': 'off',
				'no-var': 'off',

				// should be fixed / easy to fix
				'prefer-promise-reject-errors': 'off',
				'n/prefer-global/process': 'off',
				'n/prefer-global/buffer': 'off',
				'n/no-process-exit': 'off',
				'n/no-unpublished-import': 'off',
				'n/no-unpublished-require': 'off',
				'eslint-comments/require-description': 'off',
				// could be fixed when converting to ESM
				'import/order': 'off',
				// a bit more complex to fix (but nice idea in general)
				'import/no-default-export': 'off',
				'no-console': 'off',
				'func-names': 'off',
				'jsonc/sort-keys': 'off',
			},
		},
	],
	{
		prettier: false,
		comments: true,
	}
)
