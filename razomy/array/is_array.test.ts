import {isArray} from './is_array';

describe('array', () => {
  describe('isArray', () => {
    // 1. Standard cases - arrays
    it('returns true for a non-empty array of numbers', () => {
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it('returns true for an empty array', () => {
      expect(isArray([])).toBe(true);
    });

    it('returns true for an array of strings', () => {
      expect(isArray(['a', 'b', 'c'])).toBe(true);
    });

    it('returns true for an array of mixed types', () => {
      expect(isArray([1, 'hello', true, null, undefined, {}, []])).toBe(true);
    });

    it('returns true for nested arrays', () => {
      expect(isArray([[1, 2], [3, 4]])).toBe(true);
    });

    // 2. Standard cases - non-arrays
    it('returns false for a string', () => {
      expect(isArray('hello')).toBe(false);
    });

    it('returns false for a number', () => {
      expect(isArray(42)).toBe(false);
    });

    it('returns false for a boolean', () => {
      expect(isArray(true)).toBe(false);
      expect(isArray(false)).toBe(false);
    });

    it('returns false for an object', () => {
      expect(isArray({a: 1, b: 2})).toBe(false);
    });

    it('returns false for null', () => {
      expect(isArray(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isArray(undefined)).toBe(false);
    });

    // 3. Edge cases - array-like objects
    it('returns false for an arguments object', () => {
      (function () {
        expect(isArray(arguments)).toBe(false);
      })();
    });

    it('returns false for a NodeList-like object (array-like)', () => {
      const arrayLike = {0: 'a', 1: 'b', length: 2};
      expect(isArray(arrayLike)).toBe(false);
    });

    it('returns false for a typed array (Uint8Array)', () => {
      expect(isArray(new Uint8Array([1, 2, 3]))).toBe(false);
    });

    it('returns false for a Set', () => {
      expect(isArray(new Set([1, 2, 3]))).toBe(false);
    });

    it('returns false for a Map', () => {
      expect(isArray(new Map())).toBe(false);
    });

    // 4. Edge cases - other primitives and special values
    it('returns false for a function', () => {
      expect(isArray(() => {
      })).toBe(false);
    });

    it('returns false for a symbol', () => {
      expect(isArray(Symbol('test'))).toBe(false);
    });

    it('returns false for a bigint', () => {
      expect(isArray(BigInt(10))).toBe(false);
    });

    it('returns false for NaN', () => {
      expect(isArray(NaN)).toBe(false);
    });

    it('returns false for Infinity', () => {
      expect(isArray(Infinity)).toBe(false);
    });

    it('returns false for a Date object', () => {
      expect(isArray(new Date())).toBe(false);
    });

    it('returns false for a RegExp', () => {
      expect(isArray(/regex/)).toBe(false);
    });
  });
});
