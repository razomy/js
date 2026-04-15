import * as dict from "@razomy/dict";

describe('isPlainObject', () => {
  // 1. Standard plain objects
  it('returns true for a plain object literal', () => {
    expect(dict.isPlainObject({ a: 1, b: 2 })).toBe(true);
  });

  it('returns true for an empty object literal', () => {
    expect(dict.isPlainObject({})).toBe(true);
  });

  it('returns true for an object created with new Object()', () => {
    expect(dict.isPlainObject(new Object())).toBe(true);
  });

  it('returns true for an object created with Object.create(null)', () => {
    expect(dict.isPlainObject(Object.create(null))).toBe(true);
  });

  it('returns true for an object created with Object.create(Object.prototype)', () => {
    expect(dict.isPlainObject(Object.create(Object.prototype))).toBe(true);
  });

  it('returns true for a nested plain object', () => {
    expect(dict.isPlainObject({ nested: { deep: true } })).toBe(true);
  });

  // 2. Primitives
  it('returns false for null', () => {
    expect(dict.isPlainObject(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(dict.isPlainObject(undefined)).toBe(false);
  });

  it('returns false for a number', () => {
    expect(dict.isPlainObject(42)).toBe(false);
  });

  it('returns false for a string', () => {
    expect(dict.isPlainObject('hello')).toBe(false);
  });

  it('returns false for a boolean', () => {
    expect(dict.isPlainObject(true)).toBe(false);
  });

  it('returns false for a symbol', () => {
    expect(dict.isPlainObject(Symbol('test'))).toBe(false);
  });

  it('returns false for a bigint', () => {
    expect(dict.isPlainObject(BigInt(123))).toBe(false);
  });

  // 3. Arrays and built-in objects
  it('returns false for an array', () => {
    expect(dict.isPlainObject([1, 2, 3])).toBe(false);
  });

  it('returns false for an empty array', () => {
    expect(dict.isPlainObject([])).toBe(false);
  });

  it('returns false for a Date instance', () => {
    expect(dict.isPlainObject(new Date())).toBe(false);
  });

  it('returns false for a RegExp instance', () => {
    expect(dict.isPlainObject(/regex/)).toBe(false);
  });

  it('returns false for a Map instance', () => {
    expect(dict.isPlainObject(new Map())).toBe(false);
  });

  it('returns false for a Set instance', () => {
    expect(dict.isPlainObject(new Set())).toBe(false);
  });

  it('returns false for an Error instance', () => {
    expect(dict.isPlainObject(new Error('test'))).toBe(false);
  });

  it('returns false for a Promise instance', () => {
    expect(dict.isPlainObject(Promise.resolve())).toBe(false);
  });

  // 4. Functions
  it('returns false for a function', () => {
    expect(dict.isPlainObject(() => {})).toBe(false);
  });

  it('returns false for a class constructor', () => {
    class Foo {}

    expect(dict.isPlainObject(Foo)).toBe(false);
  });

  // 5. Class instances
  it('returns false for a class instance', () => {
    class MyClass {
      x = 1;
    }

    expect(dict.isPlainObject(new MyClass())).toBe(false);
  });

  it('returns false for an instance of a subclass', () => {
    class Base {}

    class Child extends Base {}

    expect(dict.isPlainObject(new Child())).toBe(false);
  });

  // 6. Objects with custom prototypes
  it('returns false for an object created with Object.create({ custom: true })', () => {
    const customProto = { custom: true };
    expect(dict.isPlainObject(Object.create(customProto))).toBe(false);
  });

  // 7. Boxed primitives
  it('returns false for a Number object', () => {
    expect(dict.isPlainObject(new Number(42))).toBe(false);
  });

  it('returns false for a String object', () => {
    expect(dict.isPlainObject(new String('hello'))).toBe(false);
  });

  it('returns false for a Boolean object', () => {
    expect(dict.isPlainObject(new Boolean(true))).toBe(false);
  });

  // 8. Edge cases
  it('returns true for an object with various property types', () => {
    const obj = { str: 'a', num: 1, bool: true, nil: null, undef: undefined, arr: [1], nested: {} };
    expect(dict.isPlainObject(obj)).toBe(true);
  });

  it('returns false for arguments object', () => {
    function test() {
      return dict.isPlainObject(arguments);
    }

    expect(test()).toBe(false);
  });
});
