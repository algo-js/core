import { greatestCommonDivisor } from '..';

/**
 * Returns least common multiple of two numbers using GCD
 *
 * @link https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function leastCommonMultiple(a: number, b: number): number {
  return Math.abs(a * b) / greatestCommonDivisor(a, b);
}
