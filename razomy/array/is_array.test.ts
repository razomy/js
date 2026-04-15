import * as array from "@razomy/array";

describe('array', () => {
  describe('isArray', () => {
    // 1. Standard cases - arrays
    it('returns true for a non-empty array of numbers', () => {
      expect(array.isArray([1, 2, 3])).toBe(true);
    });

    it('returns true for an empty array', () => {
      expect(array.isArray([])).toBe(true);
    });

    it('returns true for an array of strings', () => {
      expect(array.isArray(['a', 'b', 'c'])).toBe(true);
    });

    it('returns true for an array of mixed types', () => {
      expect(array.isArray([1, 'hello', true, null, undefined, {}, []])).toBe(true);
    });

    it('returns true for nested arrays', () => {
      expect(
        array.isArray([
          [1, 2],
          [3, 4],
        ]),
      ).toBe(true);
    });

    // 2. Standard cases - non-arrays
    it('returns false for a string', () => {
      expect(array.isArray('hello')).toBe(false);
    });

    it('returns false for a number', () => {
      expect(array.isArray(42)).toBe(false);
    });

    it('returns false for a boolean', () => {
      expect(array.isArray(true)).toBe(false);
      expect(array.isArray(false)).toBe(false);
    });

    it('returns false for an object', () => {
      expect(array.isArray({ a: 1, b: 2 })).toBe(false);
    });

    it('returns false for null', () => {
      expect(array.isArray(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(array.isArray(undefined)).toBe(false);
    });

    // 3. Edge cases - array-like objects
    it('returns false for an arguments object', () => {
      (function () {
        expect(array.isArray(arguments)).toBe(false);
      })();
    });

    it('returns false for a NodeList-like object (array-like)', () => {
      const arrayLike = { 0: 'a', 1: 'b', length: 2 };
      expect(array.isArray(arrayLike)).toBe(false);
    });

    it('returns false for a typed array (Uint8Array)', () => {
      expect(array.isArray(new Uint8Array([1, 2, 3]))).toBe(false);
    });

    it('returns false for a Set', () => {
      expect(array.isArray(new Set([1, 2, 3]))).toBe(false);
    });

    it('returns false for a Map', () => {
      expect(array.isArray(new Map())).toBe(false);
    });

    // 4. Edge cases - other primitives and special values
    it('returns false for a function', () => {
      expect(array.isArray(() => {})).toBe(false);
    });

    it('returns false for a symbol', () => {
      expect(array.isArray(Symbol('test'))).toBe(false);
    });

    it('returns false for a bigint', () => {
      expect(array.isArray(BigInt(10))).toBe(false);
    });

    it('returns false for NaN', () => {
      expect(array.isArray(NaN)).toBe(false);
    });

    it('returns false for Infinity', () => {
      expect(array.isArray(Infinity)).toBe(false);
    });

    it('returns false for a Date object', () => {
      expect(array.isArray(new Date())).toBe(false);
    });

    it('returns false for a RegExp', () => {
      expect(array.isArray(/regex/)).toBe(false);
    });
  });
});
