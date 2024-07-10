import { audiolab } from '@swrlab/style-guide/eslint/index'

export default audiolab(
	[
		{
			ignores: [],
		},
		{
			rules: {
				// previous config (does not trigger errors)
				// 'import/no-extraneous-dependencies': 0,
				// radix: 0,
				// 'no-param-reassign': [2, { props: false }],
				// 'no-restricted-syntax': 0,
				// 'no-underscore-dangle': 0,
				// 'no-return-assign': ['error', 'except-parens'],
				// 'one-var': 0,

				// should be fixed / easy to fix
				'prefer-promise-reject-errors': 'off',
				'n/prefer-global/process': 'off',
				'n/prefer-global/buffer': 'off',
				'n/no-process-exit': 'off',
				'n/no-unpublished-import': 'off',
				'n/no-unpublished-require': 'off',
				'eslint-comments/require-description': 'off',
				'vue/multi-word-component-names': 'off',
				// could be fixed when converting to ESM
				'import/order': 'off',
				// a bit more complex to fix (but nice idea in general)
				'import/no-default-export': 'off',
				'no-console': 'off',

				// harder to fix
			},
		},
	],
	{
		prettier: true,
		comments: true,
	}
)
