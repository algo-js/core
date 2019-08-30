/**
 * Returns nearest highest power of two from specific number
 *
 * @param {number} value
 * @returns {number}
 */
export function nearestHighestPowerOfTwo(value: number): number {
  return Math.ceil(Math.log2(value));
}
