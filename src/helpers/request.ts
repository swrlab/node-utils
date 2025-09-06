import { Buffer } from 'node:buffer'
import process from 'node:process'

import pkg from '../../package.json' with { type: 'json' }
const convertReadableStream = async (readable: any) => {
	// create output details
	let string = ''
	const chunks = []

	// handle each chunk
	for await (const chunk of readable) {
		string += chunk
		chunks.push(chunk)
	}

	// reformat buffer
	const buffer = Buffer.concat(chunks)

	// return data
	return { string, buffer }
}
const { name, version } = pkg

const userAgent = `${name.replace('@', '')}/${version}`

const defaultOptions: RequestInit = {
	method: 'GET',
	// keepAliveTimeout: 30e3,
	// headersTimeout: 0,
	// bodyTimeout: 0,
	headers: {
		'user-agent': process.env.USER_AGENT || userAgent,
	},
}

/** 7 seconds (as milliseconds) */
const DEFAULT_TIMEOUT = 7e3

type OptionsTimeout = { timeout: number }
type OptionsReject = { reject: boolean }

export const request = async (
	url: string,
	options: RequestInit & OptionsTimeout & OptionsReject
): Promise<Record<any, any>> => {
	const requestOptions = {
		...defaultOptions,
		method: options?.method || 'GET',
		body: options?.body || undefined,
		signal: AbortSignal.timeout(options?.timeout || DEFAULT_TIMEOUT),
	}
	if (options?.headers)
		requestOptions.headers = {
			...requestOptions.headers,
			...options.headers,
		}

	// make actual request
	const { status, headers, url: finalUrl, body, ok, redirected } = await fetch(url, requestOptions as RequestInit)
	const statusCode = status

	// const ok = statusCode >= 200 && statusCode < 300
	if (!ok && (!options || options?.reject !== false)) return Promise.reject({ statusCode, ok, headers, url })

	// turn stream into string
	const { string, buffer } = await convertReadableStream(body)

	// detect/ set redirect
	// const redirect = statusCode >= 300 && statusCode < 400 && headers.location ? new URL(headers.location, url) : null

	// fetch header vars
	const contentType = headers.get('content-type')

	// parse json if set
	let json
	try {
		json = contentType?.includes('application/json') ? JSON.parse(string) : null
	} catch {
		json = null
	}

	// return data
	return Promise.resolve({
		statusCode,
		ok,
		redirect: redirected ? finalUrl : undefined,
		headers,
		contentType,
		/** @deprecated */
		trailers: new Error('not supported any longer'),
		body,
		status,
		string,
		buffer,
		json,
	})
}
