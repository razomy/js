import { isPlainObject } from './is_plain_object';

describe('isPlainObject', () => {
  // 1. Standard plain objects
  it('returns true for a plain object literal', () => {
    expect(isPlainObject({ a: 1, b: 2 })).toBe(true);
  });

  it('returns true for an empty object literal', () => {
    expect(isPlainObject({})).toBe(true);
  });

  it('returns true for an object created with new Object()', () => {
    expect(isPlainObject(new Object())).toBe(true);
  });

  it('returns true for an object created with Object.create(null)', () => {
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it('returns true for an object created with Object.create(Object.prototype)', () => {
    expect(isPlainObject(Object.create(Object.prototype))).toBe(true);
  });

  it('returns true for a nested plain object', () => {
    expect(isPlainObject({ nested: { deep: true } })).toBe(true);
  });

  // 2. Primitives
  it('returns false for null', () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isPlainObject(undefined)).toBe(false);
  });

  it('returns false for a number', () => {
    expect(isPlainObject(42)).toBe(false);
  });

  it('returns false for a string', () => {
    expect(isPlainObject('hello')).toBe(false);
  });

  it('returns false for a boolean', () => {
    expect(isPlainObject(true)).toBe(false);
  });

  it('returns false for a symbol', () => {
    expect(isPlainObject(Symbol('test'))).toBe(false);
  });

  it('returns false for a bigint', () => {
    expect(isPlainObject(BigInt(123))).toBe(false);
  });

  // 3. Arrays and built-in objects
  it('returns false for an array', () => {
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it('returns false for an empty array', () => {
    expect(isPlainObject([])).toBe(false);
  });

  it('returns false for a Date instance', () => {
    expect(isPlainObject(new Date())).toBe(false);
  });

  it('returns false for a RegExp instance', () => {
    expect(isPlainObject(/regex/)).toBe(false);
  });

  it('returns false for a Map instance', () => {
    expect(isPlainObject(new Map())).toBe(false);
  });

  it('returns false for a Set instance', () => {
    expect(isPlainObject(new Set())).toBe(false);
  });

  it('returns false for an Error instance', () => {
    expect(isPlainObject(new Error('test'))).toBe(false);
  });

  it('returns false for a Promise instance', () => {
    expect(isPlainObject(Promise.resolve())).toBe(false);
  });

  // 4. Functions
  it('returns false for a function', () => {
    expect(isPlainObject(() => {})).toBe(false);
  });

  it('returns false for a class constructor', () => {
    class Foo {}

    expect(isPlainObject(Foo)).toBe(false);
  });

  // 5. Class instances
  it('returns false for a class instance', () => {
    class MyClass {
      x = 1;
    }

    expect(isPlainObject(new MyClass())).toBe(false);
  });

  it('returns false for an instance of a subclass', () => {
    class Base {}

    class Child extends Base {}

    expect(isPlainObject(new Child())).toBe(false);
  });

  // 6. Objects with custom prototypes
  it('returns false for an object created with Object.create({ custom: true })', () => {
    const customProto = { custom: true };
    expect(isPlainObject(Object.create(customProto))).toBe(false);
  });

  // 7. Boxed primitives
  it('returns false for a Number object', () => {
    // eslint-disable-next-line no-new-wrappers
    expect(isPlainObject(new Number(42))).toBe(false);
  });

  it('returns false for a String object', () => {
    // eslint-disable-next-line no-new-wrappers
    expect(isPlainObject(new String('hello'))).toBe(false);
  });

  it('returns false for a Boolean object', () => {
    // eslint-disable-next-line no-new-wrappers
    expect(isPlainObject(new Boolean(true))).toBe(false);
  });

  // 8. Edge cases
  it('returns true for an object with various property types', () => {
    const obj = { str: 'a', num: 1, bool: true, nil: null, undef: undefined, arr: [1], nested: {} };
    expect(isPlainObject(obj)).toBe(true);
  });

  it('returns false for arguments object', () => {
    function test() {
      // eslint-disable-next-line prefer-rest-params
      return isPlainObject(arguments);
    }

    expect(test()).toBe(false);
  });
});
