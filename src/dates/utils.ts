import { DateTime } from 'luxon'

/** Default date locale for german */
export const DEFAULT_LOCALE = 'de-DE'

// used as luxon DateTime.fromISO input
/** ISO Date String, like `2038-01-19T03:14:08.000`. */
export type ISODateString = `${string}T${string}`

export const parseDateWithLuxon = (date: ISODateString): DateTime => DateTime.fromISO(date).setLocale(DEFAULT_LOCALE)
export const luxonFormat = (date: ISODateString, format: string): string => parseDateWithLuxon(date).toFormat(format)

export const parseDate = (date: ISODateString): Date => new Date(date)
// in the future we can use the Temporal API
// export const parseDate = (date: ISODateString): Temporal.PlainDateTime => new Temporal.PlainDateTime.from(date)

export const intlFormat = (date: ISODateString, options: Intl.DateTimeFormatOptions): string =>
	new Intl.DateTimeFormat(DEFAULT_LOCALE, options).format(parseDate(date))

/** append ` Uhr` suffix */
export const addOClock = (str: string) => `${str} Uhr`

/** removing the trailing `.` form a short weekname before a comma like so: `Mo.,` -> `Mo,` */
export const shortenWeekday = (str: string): string => str.replace('.,', ',')

type OptionsWeekdayDot = {
	/** remove the dot after the short weekday */
	weekdayWithoutDot?: boolean
}
type FormatOptions = OptionsWeekdayDot & {
	/** replaces `um` or `at` with provided string or `-` if `true` */
	timePrefix?: string | true
	/** add ` Uhr` suffix after the time */
	addOClockSuffix?: boolean
}
/**
 * Format date string and modify smaller issues.
 *
 * @param str - input string
 * @param options - FormatOptions
 *
 * @returns formatted date string
 */
export const formatDateString = (str: string, options: OptionsWeekdayDot = { weekdayWithoutDot: true }): string => {
	if (options.weekdayWithoutDot) {
		return shortenWeekday(str)
	}
	return str
}

/**
 * Format date time string and modify smaller issues.
 *
 * @param str - input string
 * @param options - FormatOptions
 *
 * @returns formatted date time string
 */
export const formatDateTimeString = (str: string, options: FormatOptions = {}): string => {
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
