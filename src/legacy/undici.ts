import type { Readable } from 'node:stream'
import type { ReadableStream } from 'node:stream/web'
import type { HeaderRecord } from 'undici/types/header.js'
import { Buffer } from 'node:buffer'
import process from 'node:process'
import undici from 'undici'
import pkg from '../../package.json' with { type: 'json' }
const { name, version } = pkg

const userAgent: string = process.env.USER_AGENT || `${name.replace('@', '')}/${version}`

const defaultOptions = {
	keepAliveTimeout: 30e3,
	headersTimeout: 0,
	bodyTimeout: 0,
	headers: {
		'user-agent': userAgent,
	},
}

/**
 * Convert a readable stream into a final buffer and into a string.
 *
 * @deprecated Just use fetch `buf = Response.arrayBuffer()` (and perhaps `new Uint8Array(buf)` for bytes) and `Response.text()` instead.
 * @param readable - Readable stream.
 * @returns - Object with `string` and `buffer` keys.
 */
const convertReadableStream = async (
	readable: ReadableStream | Readable
): Promise<{ string: string; buffer: Buffer<ArrayBuffer> }> => {
	const chunks = await Array.fromAsync(readable)
	const string = chunks.join('')
	const buffer = Buffer.concat(chunks)
	return { string, buffer }
}

/** 7_000 milliseconds */
const DEFAULT_TIMEOUT: number = 7e3

type OptionsExtension = {
	/**
	 * (Optional) Request method.
	 * @type {string}
	 * @defaultValue `GET`
	 */
	method?: RequestInit['method']

	/**
	 * (Otpional) Request Body.
	 * @type {BodyInit}
	 * @defaultValue `null`
	 */
	body?: any

	/**
	 * (Optional) Request Headers.
	 * There is a default header containing the user agent.
	 * @type {HeaderRecord}
	 * @defaultValue `{ 'user-agent': 'from ENV or with packageName and packageVersion' }`
	 */
	headers?: HeaderRecord

	/**
	 * (Optional) Timeout in milliseconds. Default is 7 seconds.
	 * @deprecated Use `{ signal: AbortSignal.timeout(options?.timeout ?? 7000) }` as fetch options.
	 * @type {number}
	 * @defaultValue `7000`
	 */
	timeout?: number

	/**
	 * Usually reserved for the signal of an AbortController.
	 * Since we have `timeout`, this will always overwrite the `signal` here.
	 * So don't set it
	 * @type {never}
	 * @defaultValue `AbortSignal.timeout(options?.timeout ?? 7000)`
	 */
	signal?: never

	/**
	 * Set to `false`, if the request should not return a rejected Promise when the Response is not `ok`
	 * @deprecated Use modern fetch `Response.ok` and then `throw new Error` or use `Promise.reject` or whatever.
	 * @type {boolean}
	 */
	reject?: boolean
}

/**
 * Undici fetch request.
 *
 * Features
 *  - Timeout 7 seconds. Can be overriden with `timeout` property in options.
 *  - Returns rejected promise if Response is not ok.
 *  - Sets user-agent (with ENV or this utils packgae name and version).
 *
 * @deprecated Just use native fetch instead or `ofetch` or `axios` if required. But modern fetch solves most problems and works in all Runtimes and Browsers.
 * @param url - The URL the request should be made to.
 * @param [options] - (Optional) Request options.
 * @returns - Object with many deprecated properties.
 */
const request = async (
	url: string | URL,
	options: Record<PropertyKey, any> & OptionsExtension
): Promise<Record<PropertyKey, any>> => {
	const requestOptions = {
		...defaultOptions,
		method: options?.method ?? 'GET',
		body: options?.body ?? null,
		signal: AbortSignal.timeout(options?.timeout ?? DEFAULT_TIMEOUT),
	}
	if (options?.headers) {
		requestOptions.headers = {
			...requestOptions.headers,
			...options.headers,
		}
	}

	const { statusCode, headers, trailers, body } = await undici.request(url, requestOptions)

	// set ok
	const ok = statusCode >= 200 && statusCode < 300
	if (!ok && (!options || options?.reject !== false)) return Promise.reject({ statusCode, ok, headers, url })

	// turn stream into string
	const { string, buffer } = await convertReadableStream(body as Readable)

	// detect/ set redirect
	const redirect =
		statusCode >= 300 && statusCode < 400 && headers.location ? new URL(headers.location as string, url) : null

	// fetch header vars
	const contentType = headers['content-type']

	// parse json if set
	let json
	try {
		json = contentType?.indexOf('application/json') !== -1 ? JSON.parse(string) : null
	} catch {
		json = null
	}

	return Promise.resolve({
		/** @deprecated modern fetch uses `Response.status` instead. */
		statusCode,
		/** @deprecated modern fetch has a `Response.ok` value. */
		ok,
		/** @deprecated modern fetch has a `Response.redirected` value. And `Response.url` is the final/latest URL. */
		redirect,
		headers,
		/** @deprecated just use modern fetch's `Response.` */
		contentType,
		/** @deprecated Probably just use `Response.headers` instead. Will be removed since unused. */
		trailers,
		body,
		string,
		/** @deprecated Modern fetch has the `Response.arrayBuffer()`. */
		buffer,
		/** @deprecated Modern fetch has the `Response.json()`. */
		json,
	})
}

/**
 * Request object, wrapped in a Datadog tracer if provided.
 * @param [tracer] - (Optional) Datadog APM Tracer object containing a tracer function.
 * @param tracer.wrap - (Optional) Object containing `name` and `request`.
 * @deprecated Just use native fetch instead or `ofetch` or `axios` if required. But modern fetch solves most problems and works in all Runtimes and Browsers.
 * @returns {object} - Request object.
 */
const optionallyWrappedRequest = (tracer?: { wrap: (name: string, request: object) => any }): object =>
	tracer?.wrap('undici.request', request) || request

export default optionallyWrappedRequest
