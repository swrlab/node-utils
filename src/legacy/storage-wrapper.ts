import type { StorageConfig, StorageWrapperInstance } from '../storage/utils.ts'
import * as google from '../storage/google.ts'

import { createUri, createUrl, deleteFile, list, load, move, save } from '../storage/index.ts'

/**
 * Create a Google Cloud Storage Wrapper.
 * @deprecated Use `@swrlab/utils/storage` instead.
 *
 * @param config - Storage Config.
 * @returns A StorageWrapper
 */
export function StorageWrapper(config: StorageConfig): Promise<Error> | StorageWrapperInstance {
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
