import audiolabPretterConfig from '@swrlab/style-guide/prettier.js'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 */
const config = {
	...audiolabPretterConfig,
	printWidth: 120,
}

export default config
