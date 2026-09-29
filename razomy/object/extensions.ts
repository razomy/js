import * as object_ from '@razomy/object';

declare global {
  interface Object {
    switch_<T, R = never>(this: T): object_.Switch<T, T, R>;
  }

  interface String {
    switch_<T, R = never>(this: T): object_.Switch<T, T, R>;
  }
}

if (!String.prototype.hasOwnProperty('switch_')) {
  Object.defineProperty(String.prototype, 'switch_', {
    value: function () {
      return object_.switch_(this);
    },
    writable: true,
    configurable: true,
    enumerable: false,
  });
}
if (!Object.prototype.hasOwnProperty('switch_')) {
  Object.defineProperty(Object.prototype, 'switch_', {
    value: function () {
      return object_.switch_(this);
    },
    writable: true,
    configurable: true,
    enumerable: false,
  });
}
