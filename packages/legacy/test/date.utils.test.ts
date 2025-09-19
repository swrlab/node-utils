import assert from 'node:assert'
import { describe, test } from 'node:test'
import { formatDateString, formatDateTimeString } from '../src/date/utils.ts'

/** german formatted date string */
const date = 'Mo., 19. Januar 2038 um 14:08'
const formattedDate = 'Mo, 19. Januar 2038 - 14:08 Uhr'

describe('date utils utils', () => {
	describe('formatDateString(): ', () => {
		test('default values', () => {
			assert.strictEqual(formatDateString(''), '')
			assert.strictEqual(formatDateString('So., 20'), 'So, 20')
			assert.strictEqual(formatDateString(date), date.replace('.,', ','))
		})
		test('weekday with dot', () => {
			assert.strictEqual(
				formatDateString('.,', {
					weekdayWithoutDot: false,
				}),
				'.,'
			)
			assert.strictEqual(
				formatDateString('.,', {
					weekdayWithoutDot: true,
				}),
				','
			)
			assert(formatDateString(date, { weekdayWithoutDot: false }).includes('.,'))
			assert(!formatDateString(date, { weekdayWithoutDot: true }).includes('.,'))
		})
	})

	describe('formatDateTimeString(): ', () => {
		test('default values', () => {
			assert.strictEqual(formatDateTimeString(''), ' Uhr')
			assert.strictEqual(formatDateTimeString(' um '), ' -  Uhr')
			assert.strictEqual(formatDateTimeString('So., 20'), 'So, 20 Uhr')
			assert.strictEqual(formatDateTimeString(date), formattedDate)
		})
		test('no modifications', () => {
			const options = {
				addOClockSuffix: false,
				timePrefix: false,
				weekdayWithoutDot: false,
			}
			assert.strictEqual(formatDateTimeString('', options), '')
			assert.strictEqual(formatDateTimeString(date, options), date)
		})
		test('addOClockSuffix', () => {
			assert.strictEqual(formatDateTimeString('', { addOClockSuffix: false }), '')
			assert.strictEqual(
				formatDateTimeString(date, { addOClockSuffix: false }),
				formattedDate.replace(' Uhr', '')
			)
			assert(!formatDateTimeString(date, { addOClockSuffix: false }).includes('Uhr'))
		})
		test('other timePrefix', () => {
			const prefix = 'hello'
			assert.strictEqual(formatDateTimeString('', { timePrefix: prefix }), ' Uhr')
			assert.strictEqual(
				formatDateTimeString(' um ', {
					timePrefix: prefix,
					addOClockSuffix: false,
				}),
				` ${prefix} `
			)
			assert(formatDateTimeString(date, { timePrefix: prefix }).includes(prefix))
		})
		test('weekday with dot', () => {
			assert.strictEqual(
				formatDateTimeString('.,', {
					weekdayWithoutDot: false,
					addOClockSuffix: false,
				}),
				'.,'
			)
			assert.strictEqual(
				formatDateTimeString('.,', {
					weekdayWithoutDot: true,
					addOClockSuffix: false,
				}),
				','
			)
			assert(formatDateTimeString(date, { weekdayWithoutDot: false }).includes('.,'))
			assert(!formatDateTimeString(date, { weekdayWithoutDot: true }).includes('.,'))
		})
	})
})
