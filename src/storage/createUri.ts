/**
 * @fileoverview This module provides easy access to combine bucket + path to unique URIs.
 * @module storage
 */

export type CloudStorageURI = {
	type: 's3' | 'gs'
	bucket: string
	path: string
}

export const s3 = (bucket: string, path: string): CloudStorageURI => ({ type: 's3', bucket, path })

export const gs = (bucket: string, path: string): CloudStorageURI => ({ type: 'gs', bucket, path })

type S3Uri<B extends string, P extends string> = `s3:/${B}${P}`
type GoogleStorageUri<B extends string, P extends string> = `s3:/${B}${P}`

export const s3Legacy = <B extends string, P extends string>(bucket: B, path: P): S3Uri<B, P> =>
	['s3:/', bucket, path].join('/') as S3Uri<B, P>

export const gsLegacy = <B extends string, P extends string>(bucket: B, path: P): GoogleStorageUri<B, P> =>
	['gs:/', bucket, path].join('/') as GoogleStorageUri<B, P>
