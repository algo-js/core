/**
 * Checks if number is power of two
 *
 * @param {number} value
 * @returns {boolean}
 */
export function isPowerOfTwo(value: number): boolean {
  return value && !(value & (value - 1));
}
