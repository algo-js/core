// tslint:disable:no-expression-statement
import test from 'ava';
import { nearestHighestPowerOfTwo } from './nearest-highest-power-of-two';

test('nearest highest power of two', t => {
  const tests = [
    [1, 0],
    [2, 1],
    [3, 2],
    [5, 3],
    [11, 4],
    [1023, 10],
    [1024, 10],
    [1025, 11],
    [2 ** 31 - 1, 31],
    [2 ** 78 - 1, 78]
  ];

  for (const v of tests) {
    const [value, power] = v;

    t.is(nearestHighestPowerOfTwo(value), power);
  }
});
