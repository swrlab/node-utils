import type { StorageConfig, StorageWrapperInstance } from '@swrlab/storage'
import { createUri, createUrl, deleteFile, google, list, load, move, save } from '@swrlab/storage'

// export const Storage = google.Storage
// export { Storage } from '@google-cloud/storage'

/**
 * Create a Google Cloud Storage Wrapper.
 * @deprecated Use `@swrlab/utils/storage` instead.
 *
 * @param config - Storage Config.
 * @returns A StorageWrapper
 */
function StorageWrapper(config: StorageConfig): Promise<Error> | StorageWrapperInstance {
	if (!config || !config.gs) {
		throw new Error('storage config invalid')
	}

	google.initialize(config.gs)

	const api: StorageWrapperInstance = {
		createUri,
		createUrl,
		/** @deprecated Use `deleteFile` instead. */
		delete: deleteFile,
		deleteFile,
		list,
		load,
		save,
		move,
	}

	return api
}

export default StorageWrapper
