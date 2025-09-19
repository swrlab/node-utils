import { afterEach, describe, expect, it, vi } from 'vitest'
import { coreId } from '../src/ard/coreId.ts'
import { createHashedId } from '../src/ard/index.ts'

describe('createHashedId', () => {
	it('should return the correct hashed Id', () => {
		expect(createHashedId('test')).toBe('0c171b2e54a30c11')
	})
})

describe('coreId', () => {
	const consoleErrorMock = vi.spyOn(globalThis.console, 'error').mockImplementation(() => undefined)
	const consoleInfoMock = vi.spyOn(globalThis.console, 'info').mockImplementation(() => undefined)

	afterEach(() => {
		consoleErrorMock.mockReset()
		consoleInfoMock.mockReset()
	})

	it('should call console.error since no input value is passed in', () => {
		coreId()
		expect(consoleErrorMock).toHaveBeenCalledTimes(1)
		expect(consoleInfoMock).not.toHaveBeenCalled()
	})

	it('should return the hashed arg input as checksum as last console.info call', () => {
		// just making sure the mockReset works
		expect(consoleErrorMock).toHaveBeenCalledTimes(0)
		// mocking 'node:process'
		// eslint-disable-next-line node/prefer-global/process -- it's just for mocking
		globalThis.process.argv = ['2', '4', 'input']
		// vi.mock('node:process', () => {
		// 	return { default: { argv: ['3', '6', 'asdf'] } }
		// })
		coreId()
		expect(consoleErrorMock).not.toHaveBeenCalled()
		expect(consoleInfoMock).toHaveBeenCalledTimes(5)
		expect(consoleInfoMock).toHaveBeenLastCalledWith(createHashedId('input'))
	})
})
