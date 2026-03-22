/**
 * @fileoverview API for Storage.
 */

import type { Buffer } from 'node:buffer'
import type { File } from '@google-cloud/storage'
import { randomUUID } from 'node:crypto'
import os from 'node:os'
import path from 'node:path'
import * as google from './google.ts'
import * as localFs from './local.ts'
import { isCloudStorageUrl, isHttpUrl, validateUrl } from './utils.ts'

export * as createUri from './createUri.ts'
export type { CloudStorageUrl, StorageConfig, StorageWrapperInstance } from './utils.ts'
export { google, isCloudStorageUrl, isHttpUrl, localFs, validateUrl }

export const createUrl = async (url: string, ttl: number): Promise<string> => {
	validateUrl(url)
	return isCloudStorageUrl(url) ? await google.createSignedUrl(url, ttl) : Promise.resolve(url)
}

export const deleteFile = async (url: string): Promise<void> => {
	if (isCloudStorageUrl(url)) {
		await google.deleteFile(url)
	}
	// abort for http(s):// urls
	if (isHttpUrl(url)) {
		return
	}
	// here we should have a local path
	await localFs.deleteFile(url)
}

export const list = async (url: string): Promise<(File | string)[]> => {
	if (isCloudStorageUrl(url)) {
		return await google.listFiles(url)
	}
	// abort for http(s):// urls
	if (isHttpUrl(url)) {
		return Promise.reject(new Error('http(s) urls are not supported for listing files'))
	}

	return await localFs.listFiles(url)
}

const fetchContents = async (url: string, timeout?: number): Promise<ArrayBufferLike> => {
	const requestInit: RequestInit = {
		method: 'GET',
		headers: { 'User-Agent': 'node-storage-wrapper' },
	}
	if (timeout) {
		requestInit.signal = AbortSignal.timeout(timeout)
	}
	const response = await fetch(url, requestInit)

	if (response.ok) {
		return response.arrayBuffer()
	}

	throw new Error(`fetching url failed with status > ${response.status}`)
}

export const load = async (uri: string): Promise<Buffer<ArrayBufferLike> | ArrayBufferLike | string> => {
	if (isCloudStorageUrl(uri)) {
		return await google.download(uri)
	}
	if (isHttpUrl(uri)) {
		return fetchContents(uri)
	}

	return await localFs.readFile(uri)
}

const createTempFile = async (contents: any): Promise<string> => {
	const filePath = path.resolve(os.tmpdir(), randomUUID())
	await localFs.writeFile(filePath, contents)
	return filePath
}

export const save = async (
	uri: string,
	contents: Buffer<ArrayBufferLike> | ArrayBufferLike | string,
	_logPrefix?: string,
	resumable?: boolean
): Promise<void> => {
	if (isCloudStorageUrl(uri)) {
		const filePath = await createTempFile(contents)
		await google.upload(uri, filePath, resumable)
		await localFs.deleteFile(filePath)
	}
	if (isHttpUrl(uri)) {
		return
	}
	localFs.writeFile(uri, contents.toString())
}

export const move = async (sourceUri: string, destinationUri: string, keepOriginal: boolean = false): Promise<void> => {
	if (isCloudStorageUrl(sourceUri) && isCloudStorageUrl(destinationUri)) {
		return await google.move(sourceUri, destinationUri, keepOriginal)
	}

	// (down)load file (from web or local)
	const blob = await load(sourceUri)

	// save file to destination
	await save(destinationUri, blob)

	// delete file if in production
	if (keepOriginal !== true) {
		await deleteFile(sourceUri)
	}
}
