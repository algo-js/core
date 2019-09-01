// tslint:disable:no-expression-statement
import test from 'ava';
import { greatestCommonDivisor } from './greatest-common-divisor';

test('finds GCD of positive numbers', t => {
  const tests = [
    [[2, 5], 1],
    [[1000026, 2330], 2],
    [[100000004, 244127], 13],
    [[1000000001, 513], 19]
  ];
  for (const vtest of tests) {
    const [v, a] = vtest;
    // @ts-ignore
    t.is(greatestCommonDivisor(...v), a);
  }
});

test('finds GCD of negative numbers', t => {
  const tests = [
    [[-2, -5], 1],
    [[-1000026, -2330], 2],
    [[-100000004, -244127], 13],
    [[-1000000001, -513], 19]
  ];
  for (const vtest of tests) {
    const [v, a] = vtest;
    // @ts-ignore
    t.is(greatestCommonDivisor(...v), a);
  }
});

test('finds GCD of 1 and 1', t => {
  t.is(greatestCommonDivisor(1, 1), 1);
});

test('works GCD with zero values', t => {
  t.is(greatestCommonDivisor(0, 0), 1);
});
