import type { Bucket, File, GetSignedUrlConfig, StorageOptions, UploadOptions } from '@google-cloud/storage'
import type { Buffer } from 'node:buffer'
import type { CloudStorageUrl } from './utils.ts'
import { Storage } from '@google-cloud/storage'

// TODO: Remove in next mayor bump. Used for legacy imports only.
export { Storage }

let storage: Storage | undefined

const parseURI = (uri: string): { bucket: string; file: string } => {
	const structure = uri.slice(5).split('/')
	const bucket = structure.shift() as string
	const file = structure.join('/')
	// version 2 (might be better)
	// const url = new URL(uri)
	// const bucket = url.hostname
	// const file = url.pathname
	return { bucket, file }
}

const getBucket = (uri: string): Bucket => {
	if (!storage) {
		throw new Error('Storage instance is missing')
	}
	const { bucket } = parseURI(uri)
	return storage.bucket(bucket)
}

const getFile = (uri: string): File => {
	if (!storage) {
		throw new Error('Storage instance is missing')
	}
	const { bucket, file } = parseURI(uri)
	return storage.bucket(bucket).file(file)
}

// Public API:

export const initialize = (config: StorageOptions): void => {
	storage = new Storage(config)
}

export const createSignedUrl = async (uri: string, ttl: number): Promise<string> => {
	// assert(storage, 'Storage must be initialized before')
	if (!storage) {
		throw new Error('Storage instance is missing')
	}
	// const structure = inputUrl.slice(5).split('/')
	// const bucket = structure.shift() as string
	// const path = structure.join('/')

	const config: GetSignedUrlConfig = {
		action: 'read',
		expires: Date.now() + ttl,
	}
	const [signedUrl] = await getFile(uri).getSignedUrl(config)
	return signedUrl
}

export const deleteFile = async (uri: string): Promise<void> => {
	await getFile(uri).delete()
}

export const listFiles = async (uri: string): Promise<File[]> => {
	const [list] = await getBucket(uri).getFiles({
		prefix: parseURI(uri).file,
	})
	return list
}

/**
 * Download file from Google Storage.
 *
 * @param {string} uri - The Google Storage URI to be downloaded.
 * @returns Contents of the file.
 */
export const download = async (uri: string): Promise<Buffer<ArrayBufferLike>> => {
	const [contents] = await getFile(uri).download()
	return contents
}

export const move = async (
	sourceUri: CloudStorageUrl,
	destinationUri: CloudStorageUrl,
	keepOriginal: boolean = false
): Promise<void> => {
	const source = getFile(sourceUri)
	if (keepOriginal === true) {
		// copy only, if the original file should be kept.
		await source.copy(destinationUri)
		return
	}
	// otherwise move the file within GCS.
	await source.move(destinationUri)
}

/**
 * Upload the file to Google Cloud Storage (GCS).
 *
 * @param {string} uri - The Google Storage URI to the uploaded file.
 * @param {string} filePath - Full path to the file to be uploaded.
 * @param {boolean} resumable - Set to `true` if the upload should be resumable.
 */
export const upload = async (uri: string, filePath: string, resumable?: boolean): Promise<void> => {
	const destination = parseURI(uri).file
	const options: UploadOptions = {
		gzip: false,
		destination,
		metadata: {},
	}

	if (resumable !== undefined) {
		options.resumable = resumable
	}

	await getBucket(uri).upload(filePath, options)
}
