import * as string from '@razomy/string';

describe('string', () => {
  describe('isString', () => {
    // 1. Standard cases - strings
    it('returns true for a regular string', () => {
      expect(string.isString('razomy')).toBe(true);
    });

    it('returns true for an empty string', () => {
      expect(string.isString('')).toBe(true);
    });

    it('returns true for a string with spaces', () => {
      expect(string.isString('   ')).toBe(true);
    });

    it('returns true for a template literal string', () => {
      expect(string.isString(`hello ${'world'}`)).toBe(true);
    });

    // 2. Non-string primitives
    it('returns false for a number', () => {
      expect(string.isString(123)).toBe(false);
    });

    it('returns false for zero', () => {
      expect(string.isString(0)).toBe(false);
    });

    it('returns false for NaN', () => {
      expect(string.isString(NaN)).toBe(false);
    });

    it('returns false for a boolean true', () => {
      expect(string.isString(true)).toBe(false);
    });

    it('returns false for a boolean false', () => {
      expect(string.isString(false)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(string.isString(undefined)).toBe(false);
    });

    it('returns false for null', () => {
      expect(string.isString(null)).toBe(false);
    });

    it('returns false for a symbol', () => {
      expect(string.isString(Symbol('test'))).toBe(false);
    });

    it('returns false for a bigint', () => {
      expect(string.isString(BigInt(123))).toBe(false);
    });

    // 3. Non-string reference types
    it('returns false for an object', () => {
      expect(string.isString({})).toBe(false);
    });

    it('returns false for an array', () => {
      expect(string.isString([])).toBe(false);
    });

    it('returns false for an array of strings', () => {
      expect(string.isString(['hello'])).toBe(false);
    });

    it('returns false for a function', () => {
      expect(string.isString(() => 'hello')).toBe(false);
    });

    it('returns false for a Date object', () => {
      expect(string.isString(new Date())).toBe(false);
    });

    it('returns false for a RegExp', () => {
      expect(string.isString(/abc/)).toBe(false);
    });

    // 4. String object wrapper (boxed string)
    it('returns false for a String object (new String())', () => {
      expect(string.isString(new String('hello'))).toBe(false);
    });

    // 5. Type guard behavior
    it('narrows the type correctly when used as a type guard', () => {
      const value: unknown = 'test';
      if (string.isString(value)) {
        // If type guard works, value should be usable as a string
        expect(value.length).toBe(4);
      } else {
        fail('Expected value to be identified as a string');
      }
    });
  });
});
