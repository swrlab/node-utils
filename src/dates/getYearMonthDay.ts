import { type ISODateString, luxonFormat } from './utils.ts'

/**
 * Get YYYYMMDD.
 *
 * @param date - ISO date string
 * @returns date string formatted like '19700101'
 */
export const getYearMonthDay = (date: ISODateString): string => luxonFormat(date, 'yyyyLLdd')
