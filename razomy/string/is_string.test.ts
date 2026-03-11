import { isString } from './is_string';

describe('string', () => {
  describe('isString', () => {
    // 1. Standard cases - strings
    it('returns true for a regular string', () => {
      expect(isString('razomy')).toBe(true);
    });

    it('returns true for an empty string', () => {
      expect(isString('')).toBe(true);
    });

    it('returns true for a string with spaces', () => {
      expect(isString('   ')).toBe(true);
    });

    it('returns true for a template literal string', () => {
      expect(isString(`hello ${'world'}`)).toBe(true);
    });

    // 2. Non-string primitives
    it('returns false for a number', () => {
      expect(isString(123)).toBe(false);
    });

    it('returns false for zero', () => {
      expect(isString(0)).toBe(false);
    });

    it('returns false for NaN', () => {
      expect(isString(NaN)).toBe(false);
    });

    it('returns false for a boolean true', () => {
      expect(isString(true)).toBe(false);
    });

    it('returns false for a boolean false', () => {
      expect(isString(false)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isString(undefined)).toBe(false);
    });

    it('returns false for null', () => {
      expect(isString(null)).toBe(false);
    });

    it('returns false for a symbol', () => {
      expect(isString(Symbol('test'))).toBe(false);
    });

    it('returns false for a bigint', () => {
      expect(isString(BigInt(123))).toBe(false);
    });

    // 3. Non-string reference types
    it('returns false for an object', () => {
      expect(isString({})).toBe(false);
    });

    it('returns false for an array', () => {
      expect(isString([])).toBe(false);
    });

    it('returns false for an array of strings', () => {
      expect(isString(['hello'])).toBe(false);
    });

    it('returns false for a function', () => {
      expect(isString(() => 'hello')).toBe(false);
    });

    it('returns false for a Date object', () => {
      expect(isString(new Date())).toBe(false);
    });

    it('returns false for a RegExp', () => {
      expect(isString(/abc/)).toBe(false);
    });

    // 4. String object wrapper (boxed string)
    it('returns false for a String object (new String())', () => {
      // eslint-disable-next-line no-new-wrappers
      expect(isString(new String('hello'))).toBe(false);
    });

    // 5. Type guard behavior
    it('narrows the type correctly when used as a type guard', () => {
      const value: unknown = 'test';
      if (isString(value)) {
        // If type guard works, value should be usable as a string
        expect(value.length).toBe(4);
      } else {
        fail('Expected value to be identified as a string');
      }
    });
  });
});
