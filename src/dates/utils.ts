// used as luxon DateTime.fromISO input
/** ISO Date String, like `2038-01-19T03:14:08.000`. */
export type ISODateString = `${string}T${string}`

/** append ` Uhr` suffix */
const addOClock = (str: string) => `${str} Uhr`

type FormatOptions = {
	/** remove the dot after the short weekday */
	weekdayWithoutDot?: boolean
	/** replaces `um` or `at` with provided string or `-` if `true` */
	timePrefix?: string | true
	/** add ` Uhr` suffix after the time */
	addOClockSuffix?: boolean
}
/**
 * Format Date String and modify smaller issues.
 *
 * @param str - input string
 * @param options - FormatOptions
 *
 * @returns formatted date string
 */
export const formatDateString = (str: string, options: FormatOptions = {}): string => {
	const { weekdayWithoutDot = true, timePrefix = true, addOClockSuffix = true } = options
	let formatted = str
	if (weekdayWithoutDot) {
		formatted = formatted.replace('.,', ',')
	}
	if (timePrefix) {
		const prefix = timePrefix !== true ? timePrefix : '-'
		formatted = formatted.replace(/ um /, ` ${prefix} `)
	}
	if (addOClockSuffix) {
		formatted = addOClock(formatted)
	}
	return formatted
}
