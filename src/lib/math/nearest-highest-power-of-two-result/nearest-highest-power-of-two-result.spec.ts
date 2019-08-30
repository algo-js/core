// tslint:disable:no-expression-statement
import test from 'ava';
import { nearestHighestPowerOfTwoResult } from './nearest-highest-power-of-two-result';

test('exponentiation of nearest highest power of two', t => {
  const tests = [
    [1, 2 ** 0],
    [2, 2 ** 1],
    [3, 2 ** 2],
    [5, 2 ** 3],
    [11, 2 ** 4],
    [1023, 2 ** 10],
    [1024, 2 ** 10],
    [1025, 2 ** 11],
    [2 ** 31 - 1, 2 ** 31],
    [2 ** 78 - 1, 2 ** 78]
  ];

  for (const v of tests) {
    const [value, power] = v;

    t.is(nearestHighestPowerOfTwoResult(value), power);
  }
});
