/**
 * Environment variable utilities with TypeScript support
 * @fileoverview
 */

import process from 'node:process'
import { parseBase64 } from './string/base64.ts'

/**
 * Type definitions for environment variable value types.
 * boolean accepts `true` and `1`.
 * base64 is parsed as JSON after decoding.
 */
type EnvVarType = 'string' | 'number' | 'boolean' | 'json' | 'base64'

/**
 * Configuration for environment variable retrieval
 */
interface EnvConfig<T> {
	/** Default value if environment variable is not set */
	defaultValue?: T | undefined
	/** Whether the environment variable is required */
	required?: boolean
	/** Type of the environment variable */
	type?: EnvVarType
}

/**
 * Error thrown when a required environment variable is missing
 */
export class MissingEnvVarError extends Error {
	constructor(key: string) {
		super(`Missing required environment variable: ${key}`)
		this.name = 'MissingEnvVarError'
	}
}

/**
 * Get an environment variable with proper typing
 *
 * @param key - The name of the environment variable
 * @param config - Configuration options
 * @returns The value of the environment variable with proper typing
 * @throws {MissingEnvVarError} When a required environment variable is missing
 * @throws {Error} When JSON parsing fails
 */
export function getEnv<T = string>(key: string, config: EnvConfig<T> = {}): T {
	const { defaultValue, required = false, type = 'string' } = config

	// @ts-expect-error - Insert mocked values from vitest test.
	const env = globalThis.__VitestMockEnv ?? process.env
	// eslint-disable-next-line security/detect-object-injection -- There is no unsafe user-input.
	const value = env[key]

	if (value === undefined) {
		if (required) {
			throw new MissingEnvVarError(key)
		}
		if (!required && defaultValue === undefined) {
			console.info('There is no defaultValue for optional env key', key)
		}
		return defaultValue as T
	}

	switch (type) {
		case 'string':
			return value as unknown as T

		case 'number': {
			const num = Number.parseFloat(value)
			return Number.isNaN(num) ? (defaultValue as T) : (num as unknown as T)
		}

		case 'boolean':
			return (value.toLowerCase() === 'true' || value === '1') as unknown as T

		case 'base64':
			try {
				const decoded = parseBase64(value)
				return JSON.parse(decoded) as T
			} catch (error) {
				throw new Error(`Failed to parse environment variable ${key} as from base64 JSON: ${error}`, {
					cause: error,
				})
			}

		case 'json':
			try {
				return JSON.parse(value) as T
			} catch (error) {
				throw new Error(`Failed to parse environment variable ${key} as JSON: ${error}`)
			}

		default:
			return value as unknown as T
	}
}

/**
 * Get a string environment variable
 *
 * @param key - The name of the environment variable
 * @param defaultValue - Default value if the environment variable is not set
 * @param required - Whether the environment variable is required
 * @returns The string value of the environment variable
 */
export function getEnvString(key: string, defaultValue?: string, required = true): string {
	if (required === false && defaultValue === undefined)
		console.warn('When the env value is optional, a default value should be passed.')
	return getEnv<string>(key, { defaultValue, required, type: 'string' })
}

/**
 * Get a JSON object from a base64 environment variable string.
 *
 * @param key - The name of the environment variable
 * @param defaultValue - Default value if the environment variable is not set
 * @param required - Whether the environment variable is required
 * @throws {MissingEnvVarError} When a required environment variable is missing
 * @returns The string value of the environment variable
 */
export function getEnvBase64<T>(key: string, defaultValue?: T, required = true): T {
	return getEnv<T>(key, { defaultValue, required, type: 'base64' })
}

/**
 * Get a number environment variable
 *
 * @param key - The name of the environment variable
 * @param defaultValue - Default value if the environment variable is not set
 * @param required - Whether the environment variable is required
 * @returns The number value of the environment variable
 */
export function getEnvNumber(key: string, defaultValue?: number, required = false): number {
	return getEnv<number>(key, { defaultValue, required, type: 'number' })
}

/**
 * Get a boolean environment variable
 *
 * @param key - The name of the environment variable
 * @param defaultValue - Default value if the environment variable is not set
 * @param required - Whether the environment variable is required
 * @returns The boolean value of the environment variable
 */
export function getEnvBoolean(key: string, defaultValue?: boolean, required = false): boolean {
	return getEnv<boolean>(key, { defaultValue, required, type: 'boolean' })
}

/**
 * Get a JSON environment variable
 *
 * @param key - The name of the environment variable
 * @param defaultValue - Default value if the environment variable is not set
 * @param required - Whether the environment variable is required
 * @returns The parsed JSON value of the environment variable
 */
export function getEnvJson<T>(key: string, defaultValue?: T, required = false): T {
	return getEnv<T>(key, { defaultValue, required, type: 'json' })
}
