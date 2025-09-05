import assert from 'node:assert'
import { test } from 'node:test'
import { formatDateString } from '../src/dates/utils.ts'

/** german formatted date string */
const date = 'Mo., 19. Januar 2038 um 14:08'
const formattedDate = 'Mo, 19. Januar 2038 - 14:08 Uhr'

test('formatDateString()', (t) => {
	t.test('default values', () => {
		assert.strictEqual(formatDateString(''), ' Uhr')
		assert.strictEqual(formatDateString(' um '), ' -  Uhr')
		assert.strictEqual(formatDateString('So., 20'), 'So, 20 Uhr')
		assert.strictEqual(formatDateString(date), formattedDate)
	})
	t.test('no modifications', () => {
		const options = {
			addOClockSuffix: false,
			timePrefix: false,
			weekdayWithoutDot: false,
		}
		assert.strictEqual(formatDateString('', options), '')
		assert.strictEqual(formatDateString(date, options), date)
	})
	t.test('addOClockSuffix', () => {
		assert.strictEqual(formatDateString('', { addOClockSuffix: false }), '')
		assert.strictEqual(
			formatDateString(date, { addOClockSuffix: false }),
			formattedDate.replace(' Uhr', '')
		)
		assert(!formatDateString(date, { addOClockSuffix: false }).includes('Uhr'))
	})
	t.test('other timePrefix', () => {
		const prefix = 'hello'
		assert.strictEqual(formatDateString('', { timePrefix: prefix }), ' Uhr')
		assert.strictEqual(
			formatDateString(' um ', { timePrefix: prefix, addOClockSuffix: false }),
			` ${prefix} `
		)
		assert(formatDateString(date, { timePrefix: prefix }).includes(prefix))
	})
	t.test('weekday with dot', () => {
		assert.strictEqual(
			formatDateString('.,', {
				weekdayWithoutDot: false,
				addOClockSuffix: false,
			}),
			'.,'
		)
		assert.strictEqual(
			formatDateString('.,', {
				weekdayWithoutDot: true,
				addOClockSuffix: false,
			}),
			','
		)
		assert(formatDateString(date, { weekdayWithoutDot: false }).includes('.,'))
		assert(!formatDateString(date, { weekdayWithoutDot: true }).includes('.,'))
	})
})
