import * as object_ from '@razomy/object';

// 1. Выносим сигнатуры методов в общий интерфейс
interface PipeableMethods {
  switch_<T, R = never>(this: T): object_.Switch<T, T, R>;
  pipe<T, R = never>(this: T, cb: (_: T) => R): R;
  pipeMut<T>(this: T, cb: (_: T) => void): T;
}

// 2. Добавляем их и к Object, и к String через интерфейсное наследование
declare global {
  interface Object extends PipeableMethods {}
  interface String extends PipeableMethods {}
}

// 3. В рантайме (JS) определяем ВСЁ ТОЛЬКО ОДИН РАЗ на Object.prototype:
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

if (!Object.prototype.hasOwnProperty('pipe')) {
  Object.defineProperty(Object.prototype, 'pipe', {
    value: function (cb: (arg: any) => any) {
      return cb(this);
    },
    writable: true,
    configurable: true,
    enumerable: false,
  });
}

if (!Object.prototype.hasOwnProperty('pipeMut')) {
  Object.defineProperty(Object.prototype, 'pipeMut', {
    value: function (cb: (arg: any) => any) {
      cb(this);
    },
    writable: true,
    configurable: true,
    enumerable: false,
  });
}
