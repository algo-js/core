// tslint:disable:no-expression-statement
import test from 'ava';
import { EventEmitter } from './event-emitter';

const events = {
  CREATED: Symbol('created'),
  DESTROYED: 'destroyed'
};

test('emits', t => {
  const originatedValue = Symbol('data');

  const eventEmitter = new EventEmitter<any>();

  eventEmitter.on(events.CREATED, (value, additional) => {
    t.is(value, originatedValue);
    t.is(additional, 2);
  });

  eventEmitter.on(events.DESTROYED, (value, additional) => {
    t.is(value, originatedValue);
    t.is(additional, 2);
  });

  eventEmitter.emit(events.CREATED, originatedValue, 2);
  eventEmitter.emit(events.DESTROYED, originatedValue, 2);

  eventEmitter.removeAllListeners();

  eventEmitter.once(events.CREATED, value => {
    t.is(value, originatedValue);
  });

  t.is(eventEmitter.emit(events.CREATED, originatedValue), true);
  t.is(eventEmitter.emit(events.CREATED, originatedValue), false);
});

test('once', t => {
  const originatedValue = Symbol('data');

  const eventEmitter = new EventEmitter<typeof originatedValue>();

  let invokes = 0;

  eventEmitter.once(events.CREATED, (value, additional) => {
    t.is(value, originatedValue);
    t.is(additional, 2);

    invokes++;
  });

  eventEmitter.emit(events.CREATED, originatedValue, 2);
  eventEmitter.emit(events.CREATED, originatedValue, 2);

  t.is(invokes, 1);
});

test('off', t => {
  const originatedValue = Symbol('data');

  const eventEmitter = new EventEmitter<typeof originatedValue>();

  let invokes = 0;

  const listener = (value, additional) => {
    t.is(value, originatedValue);
    t.is(additional, 2);

    invokes++;
  };

  eventEmitter.on(events.CREATED, listener);
  eventEmitter.emit(events.CREATED, originatedValue, 2);
  eventEmitter.emit(events.CREATED, originatedValue, 2);

  eventEmitter.off(events.CREATED, listener);
  eventEmitter.emit(events.CREATED, originatedValue, 2);

  t.is(invokes, 2);
});

test('removeAllListeners', t => {
  const originatedValue = Symbol('data');

  const eventEmitter = new EventEmitter<typeof originatedValue | number>();

  let invokes1 = 0;
  let invokes2 = 0;

  const listener1 = (value, additional) => {
    t.is(value, originatedValue);
    t.is(additional, 2);

    invokes1++;
  };

  const listener2 = value => {
    t.is(value, 1);

    invokes2++;
  };

  const n = 5;
  const m = 5;

  for (let i = 0; i < n; ++i) {
    eventEmitter.on(events.CREATED, listener1);
    eventEmitter.on(events.DESTROYED, listener2);
  }

  for (let i = 0; i < m; ++i) {
    eventEmitter.emit(events.CREATED, originatedValue, 2);
  }

  t.is(invokes1, n * m);
  t.is(invokes2, 0);

  // --
  eventEmitter.removeAllListeners(events.CREATED);
  eventEmitter.emit(events.CREATED, originatedValue, 2);
  t.is(invokes1, n * m);

  // --
  eventEmitter.emit(events.DESTROYED, 1);
  t.is(invokes2, m);
  eventEmitter.removeAllListeners();
  eventEmitter.emit(events.DESTROYED, 1);
  t.is(invokes2, m);
});

test('eventNames', t => {
  const originatedValue = Symbol('data');

  const eventEmitter = new EventEmitter<typeof originatedValue>();

  eventEmitter.once(events.CREATED, value => {
    t.is(value, originatedValue);
  });

  eventEmitter.emit(events.CREATED, originatedValue);

  t.is(eventEmitter.eventNames().length, 0);
});
