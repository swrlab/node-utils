import { getObjectLength } from './getObjectLength.ts'
import { isPlainObject } from './isObject.ts'

export const notEmptyObject = (value: Record<any, any>): boolean => isPlainObject(value) && getObjectLength(value) > 0
