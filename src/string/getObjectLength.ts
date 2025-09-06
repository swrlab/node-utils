/**
 * Returns the size (legth of keys) of the given object.
 *
 * @param {Record<any, any>} object - The object.
 * @returns - The length of the object.
 */
export const getObjectLength = (object: Record<any, any>): number => object && Object.keys(object).length
