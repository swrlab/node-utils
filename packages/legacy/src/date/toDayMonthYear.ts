/**
 * Format a YearMonthDay (english) date into DayMonthYear (german).
 *
 * @param date - date string
 *
 * @returns date string in `DDMMYYYY` format.
 */
export const toDayMonthYear = (date: string): string => {
	const year = date.slice(0, 4)
	const month = date.slice(4, 6)
	const day = date.slice(6, 8)
	return `${day}${month}${year}`
}
