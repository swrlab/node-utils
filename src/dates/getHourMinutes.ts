import { type ISODateString, luxonFormat } from './utils.ts'

/**
 * Get hours and minutes (returns )
 *
 * @param date - ISO date string
 *
 * @returns in _HH:mm_ format (example: `12:34` or `09:03`)
 */
export const getHourMinutes = (date: ISODateString): string => luxonFormat(date, 'HH:mm')
