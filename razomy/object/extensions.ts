import * as object_ from '@razomy/object';

interface PipeableMethods {
  match_<T, R = never>(this: T): object_.Match<T, T, R>;
  pipe<T, R = never>(this: T, cb: (_: T) => R): R;
  pipeMut<T>(this: T, cb: (_: T) => void): T;
}

// 2. Добавляем их и к Object, и к String через интерфейсное наследование
declare global {
  interface Object extends PipeableMethods {}
  interface String extends PipeableMethods {}
}

// 3. В рантайме (JS) определяем ВСЁ ТОЛЬКО ОДИН РАЗ на Object.prototype:
if (!Object.prototype.hasOwnProperty('match_')) {
  Object.defineProperty(Object.prototype, 'match_', {
    value: function () {
      return object_.match(this);
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
