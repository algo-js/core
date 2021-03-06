/**
 * Returns greatest common divider of two numbers
 * using iterative Euclid's algorithm
 *
 * Iterative algorithm much faster
 * in average ~1.335 (own benchmarks)
 * than recursive
 *
 * @link https://en.wikipedia.org/wiki/Euclidean_algorithm
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function greatestCommonDivisor(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);

  if (a === b && a === 0) {
    return 1;
  }

  if (b > a) {
    const temp = a;
    a = b;
    b = temp;
  }

  while (true) {
    a %= b;
    if (a === 0) {
      return b;
    }
    b %= a;
    if (b === 0) {
      return a;
    }
  }
}
