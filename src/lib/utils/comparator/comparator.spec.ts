// tslint:disable:no-expression-statement
import test from 'ava';
import { Comparator } from './comparator';

test('comparator equal', t => {
  const comparator = new Comparator<number>((a, b) =>
    a === b ? 0 : a < b ? -1 : 1
  );
  t.is(comparator.equal(1, 1), true);
  t.is(comparator.equal(1, 2), false);
});

test('comparator equal (default comparer)', t => {
  const numberComparator = new Comparator<number>();
  t.is(numberComparator.equal(-1, -1), true);
  t.is(numberComparator.equal(3, 4), false);

  const stringComparator = new Comparator<string>();
  t.is(stringComparator.equal('s', 's'), true);
  t.is(stringComparator.equal('2019 Year', '2020 Year'), false);
});

test('comparator less', t => {
  const comparator = new Comparator<number>();
  t.is(comparator.less(3, 4), true);
  t.is(comparator.less(-4, -3), true);
  t.is(comparator.less(-1, -1), false);
});

test('comparator lessOrEqual', t => {
  const comparator = new Comparator<number>();
  t.is(comparator.lessOrEqual(3, 4), true);
  t.is(comparator.lessOrEqual(-1, -1), true);
  t.is(comparator.lessOrEqual(-1, -2), false);
});

test('comparator greater', t => {
  const comparator = new Comparator<number>();
  t.is(comparator.greater(4, 3), true);
  t.is(comparator.greater(-1, -1), false);
});

test('comparator greaterOrEqual', t => {
  const comparator = new Comparator<number>();
  t.is(comparator.greaterOrEqual(4, 3), true);
  t.is(comparator.greaterOrEqual(-1, -1), true);
  t.is(comparator.greaterOrEqual(-2, -1), false);
});

test('comparator reverse', t => {
  const comparator = new Comparator<number>();
  t.is(comparator.less(3, 4), true);

  comparator.reverse();
  t.is(comparator.less(3, 4), false);

  comparator.reverse();
  t.is(comparator.less(3, 4), true);
});
