import assert, { equal } from 'node:assert'

export const expect = (a) => ({
	// chai
	to: {
		equal: (b) => equal(a, b),
		include: (needle) => assert(a.includes(needle)),
		be: {
			greaterThanOrEqual: (b) => a >= b,
		},
	},
	// jest / bun
	toEqual: (b) => equal(a, b),
})
