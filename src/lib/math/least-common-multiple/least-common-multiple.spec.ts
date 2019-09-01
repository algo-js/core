// tslint:disable:no-expression-statement
import test from 'ava';
import { leastCommonMultiple } from './least-common-multiple';

test('finds LCM of positive numbers', t => {
  const tests = [
    [[4, 6], 12],
    [[334, 525252], 87717084],
    [[100000004, 244127], 1877900075116],
    [[1000000001, 513], 27000000027]
  ];
  for (const vtest of tests) {
    const [v, a] = vtest;
    // @ts-ignore
    t.is(leastCommonMultiple(...v), a);
  }
});

test('finds LCM of negative numbers', t => {
  const tests = [
    [[-4, -6], 12],
    [[-334, 525252], 87717084],
    [[-100000004, 244127], 1877900075116],
    [[1000000001, -513], 27000000027]
  ];
  for (const vtest of tests) {
    const [v, a] = vtest;
    // @ts-ignore
    t.is(leastCommonMultiple(...v), a);
  }
});

test('finds LCM of 1 and 1', t => {
  t.is(leastCommonMultiple(1, 1), 1);
});

test('works LCM with zero values', t => {
  t.is(leastCommonMultiple(0, 0), 0);
});
