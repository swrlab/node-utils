import { Buffer } from 'node:buffer'
import process from 'node:process'

import pkg from '../../package.json' with { type: 'json' }
const { name, version } = pkg

const userAgent: string = process.env.USER_AGENT || `${name.replace('@', '')}/${version}`

/** 7 seconds (in milliseconds) */
const DEFAULT_TIMEOUT: number = 7e3

type OptionsTimeout = {
	/**
	 * @deprecated Don't use `timeout`. Just use `{ signal: AbortSignal.timeout(timeout) }` in request options instead. Or pass an abortController.
	 */
	timeout?: number
}
type OptionsReject = {
	/**
	 * @deprecated Don't use `reject`. Just use `Response.ok` instead on a plain fetch.
	 */
	reject?: boolean
}

/**
 * Create a fetch request.
 * Tiny wrapper around the native fetch API.
 *
 * @deprecated If possible, prefer using `fetch` directly or a package like `ofetch` instead.
 *
 * @param {string | URL} resource - URL
 * @param [options] - (Optional) fetch request options.
 * @returns - fetch response object.
 */
export const request = async (
	resource: string | URL,
	options: RequestInit & OptionsTimeout & OptionsReject = {}
): Promise<Record<any, any>> => {
	// TODO: Consider using `defu` to merge with defaul parameters safely and easily.
	const requestOptions = {
		...options,
		signal: options.signal ?? AbortSignal.timeout(options?.timeout ?? DEFAULT_TIMEOUT),
		headers: {
			'user-agent': userAgent,
			...(options.headers ?? {}),
		},
	}
	// delete non-existing request properties from the Request
	delete requestOptions.timeout
	delete requestOptions.reject

	const response = await fetch(resource, requestOptions as RequestInit)
	const { status, ok, headers, url, body, redirected } = response

	if (!ok && options?.reject === true) return Promise.reject({ statusCode: status, ok, headers, url })

	const contentType = headers.get('content-type')

	// TODO: change flow, since there are other types like `blob` and text type should be detecte too.
	// TODO: consider using `destr` for more performance, safety and Types.
	const text = await response.text()
	let json: any
	try {
		json = contentType?.includes('application/json') ? JSON.parse(text) : null
	} catch {
		json = null
	}

	return Promise.resolve({
		/** @deprecated Use `Response.status` instead. */
		statusCode: status,
		ok,
		redirectd: redirected,
		/** @deprecated Use `Response.redirected` and if true then `Response.url` is the latest one. */
		redirect: redirected ? url : undefined,
		url,
		headers,
		/** @deprecated Just use Response.headers.get('content-type') instead. */
		contentType,
		/** @deprecated Use `Response.headers` instead. */
		trailers: undefined,
		/** @deprecated Use a plain fetch if body access is neede. This one hast an already used body. */
		body,
		status,
		/** @deprecated Use `await Response.text()` instead. This can still be parsed to JSON or a Buffer. */
		string: text,
		/** @deprecated Use `Response.arrayBuffer()` instead. A Buffer can be converted to text as well. */
		buffer: Buffer.from(text, 'utf-8'),
		/** @deprecated Use `await Response.json()` instead of use `ofetch`. */
		json,
	})
}
