/**
 * Returns the result of exponentiation
 * 2 ^ (nearest highest power of two from specific number)
 *
 * Produces better performance than 2 ^ nearestHighestPowerOfTwo(v) in average
 *
 * @link http://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
 *
 * @param {number} v
 * @returns {number}
 */
export function nearestHighestPowerOfTwoResult(v: number): number {
  v--;
  v |= v >> 1;
  v |= v >> 2;
  v |= v >> 4;
  v |= v >> 8;
  v |= v >> 16;
  return ++v;
}
