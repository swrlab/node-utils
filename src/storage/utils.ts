import type { File, StorageOptions } from '@google-cloud/storage'
import type { Buffer } from 'node:buffer'
import type { CloudStorageURI } from './createUri.ts'
import assert from 'node:assert'

// Types:

export type StorageConfig = {
	gs: StorageOptions
}

type CreateUrlFn = (inputUrl: string, ttl: number) => Promise<string>

export type StorageWrapperInstance = {
	/** Create a storage URI to either `s3` or `gs` (Google Storage) with bucket and path. */
	createUri: Record<'s3' | 'gs', (bucket: string, path: string) => CloudStorageURI>
	/**
	 * @param inputURL - Input URL.
	 * @param ttl - Cache time to live in milliseconds.
	 * @returns - URL
	 */
	createUrl: CreateUrlFn
	/** @deprecated Use `deleteFile` instead. */
	delete: (url: string) => Promise<void>
	deleteFile: (url: string) => Promise<void>
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

// URL Helpers:

export type StartsWith<Prefix extends string> = `${Prefix}{string}`
/** Protocol or scheme of an URL. Must end with a `:`. */
export type Protocol = `${string}:`
export type CloudStorageUrl = StartsWith<'gs://'>
export type HttpUrl = StartsWith<'https://' | 'http://'>
export type KnownURL = CloudStorageUrl & HttpUrl

/** @returns `true` if the given protocol string is either `https:` or `http:`. */
export const isHttp = (protocol: Protocol): boolean => protocol === 'https:' || protocol === 'http:'
/** @returns `true` if the given protocol string is either `gs:` (Google Storage). */
export const isCloudStorage = (protocol: Protocol): boolean => protocol === 'gs:'

/**
 * Checks whether the given url string is a http(s) or Cloud Storage URL.
 * @param urlString - The URL to validate. Must start with `http(s)://` or `gs://`.
 * @returns `true` if the URL is valid, `false` otherwise.
 */
export const isValidUrl = (urlString: string): urlString is KnownURL => {
	const url = new URL(urlString)
	const protocol = url.protocol as Protocol
	assert(protocol.endsWith(':'), 'The URL protocol does not end with `:`.')
	return isHttp(protocol) || isCloudStorage(protocol)
}

/**
 * Throws an Error if the given url is invalid.
 * Valid urls start with either `http(s)://` or `gs://`.
 * @param {string} url - The URL string to validate.
 * @throws {Error} - If the given url is invalid.
 * @returns {void | never} - Never returns anything.
 */
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

/**
 * Checks if the given url is a valid http(s):// url.
 * @param url - The url string to check.
 * @returns - `true` if the url starts with `http(s)://`, `false` otherwise.
 */
export const isHttpUrl = (url: string): url is HttpUrl => url.startsWith('http://') || url.startsWith('https://')
