import type { StorageOptions } from '@google-cloud/storage'
import type { Buffer } from 'node:buffer'
import type { CloudStorageURI } from './createUri.ts'
import assert from 'node:assert'

// Types
export type StorageConfig = {
	gs: StorageOptions
}

type CreateUrlFn = (inputUrl: string, ttl: number) => Promise<string>

export type StorageWrapperInstance = {
	createUri: Record<'s3' | 'gs', (bucket: string, path: string) => CloudStorageURI>
	createUrl: CreateUrlFn
	delete: (url: string) => Promise<void>
	list: (url: string) => Promise<(File | string)[]>
	load: (uri: string) => Promise<Buffer<ArrayBufferLike> | ArrayBufferLike | string>
	save: (
		uri: string,
		contents: Buffer<ArrayBufferLike> | ArrayBufferLike | string,
		_logPrefix?: string,
		resumable?: boolean
	) => Promise<void>
	move: (sourceUri: string, destinationUri: string, keepOriginal: boolean) => Promise<void>
}

// URL Helpers

export type StartsWith<Prefix extends string> = `${Prefix}{string}`
export type Protocol = `${string}:`
export type CloudStorageUrl = StartsWith<'gs://'>
export type HttpUrl = StartsWith<'https://' | 'http://'>
export type KnownURL = CloudStorageUrl & HttpUrl

export const isHttp = (protocol: Protocol): boolean => protocol === 'https:' || protocol === 'http:'
export const isCloudStorage = (protocol: Protocol): boolean => protocol === 'gs:'

export const isValidUrl = (urlString: string): urlString is KnownURL => {
	const url = new URL(urlString)
	const protocol = url.protocol as Protocol
	assert(protocol.endsWith(':'), 'The URL protocol does not end with `:`.')
	return isHttp(protocol) || isCloudStorage(protocol)
}

export const validateUrl = (url: string): void | never => {
	if (!isValidUrl(url)) {
		throw new Error('not implemented')
	}
}

/**
 * Checks if the given url starts with `http(s)://` or `gs://`.
 *
 * @param {string} url - input url
 * @returns {boolean} - `true` if the url is a valid cloud or fs url, `false` otherwise.
 */
export const isCloudStorageUrl = (url: string): url is CloudStorageUrl => {
	return isCloudStorage(new URL(url).protocol as Protocol)
}

export const isHttpUrl = (url: string): url is HttpUrl => url.startsWith('http://') || url.startsWith('https://')
