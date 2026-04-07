import process from 'node:process'
import pkg from '../../package.json' with { type: 'json' }

const { name, version } = pkg

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

	/**
	 * Set to `true`, to bypass status error catching.
	 * For compat with `ofetch`.
	 */
	ignoreResponseError?: boolean
}

/**
 * Create a fetch request.
 * Tiny wrapper around the native fetch API.
 *
 * NOTE: If possible, prefer using `fetch` directly or a package like `ofetch` instead.
 *
 * @param resource - URL
 * @param [options] - (Optional) fetch request options.
 * @returns - fetch response object.
 */
export const request = async (
	resource: string | URL | Request,
	options: RequestInit & OptionsTimeout & OptionsReject = {}
): Promise<Response> => {
	const userAgent: string = process.env.USER_AGENT || `${name.replace('@', '')}/${version}`
	const requestOptions = {
		...options,
		signal: options.signal ?? AbortSignal.timeout(options?.timeout ?? DEFAULT_TIMEOUT),
		headers: {
			'user-agent': userAgent,
			// oxlint-disable-next-line typescript/no-misused-spread -- the headers are safe to use
			...options.headers,
		},
	}
	delete requestOptions.timeout
	delete requestOptions.reject
	const response = await fetch(resource, requestOptions as RequestInit)
	if (!response.ok && options?.reject === true) {
		return Promise.reject({
			status: response.status,
			ok: response.ok,
			headers: response.headers,
			url: response.url,
		})
	}
	return response
}
