// tslint:disable:no-expression-statement
import test from 'ava';
import { isPowerOfTwo } from './is-power-of-two';

test('actually power of two', t => {
  const powers = Array(32)
    .fill(0)
    .map((_, i) => 2 ** i);

  for (const power of powers) {
    t.is(isPowerOfTwo(power), true);
  }
});

test('not powers of two', t => {
  const notPowers = [3, 5, 6, 7, 9, 1e6, 1e9];

  for (const notPower of notPowers) {
    t.is(isPowerOfTwo(notPower), false);
  }
});
