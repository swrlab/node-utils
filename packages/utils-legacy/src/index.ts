import * as ard from './ard.ts'
import * as date from './date.ts'
import * as helpers from './helpers.ts'
import * as numbers from './numbers.ts'
import * as storage from './storage-wrapper.ts'
import * as strings from './strings.ts'
import * as undici from './undici.ts'

const api: Record<PropertyKey, object> = {
	ard,
	date,
	helpers,
	numbers,
	storage,
	strings,
	undici,
}

export default api
