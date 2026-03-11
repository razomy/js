import { create } from './create';

describe('string', () => {
  describe('create', () => {
    // 1. Standard cases - numbers
    it('converts a positive number to a string', () => {
      expect(create(100)).toBe('100');
    });

    it('converts a negative number to a string', () => {
      expect(create(-42)).toBe('-42');
    });

    it('converts zero to a string', () => {
      expect(create(0)).toBe('0');
    });

    it('converts a floating point number to a string', () => {
      expect(create(3.14)).toBe('3.14');
    });

    it('converts Infinity to a string', () => {
      expect(create(Infinity)).toBe('Infinity');
    });

    it('converts NaN to a string', () => {
      expect(create(NaN)).toBe('NaN');
    });

    // 2. Booleans
    it('converts true to a string', () => {
      expect(create(true)).toBe('true');
    });

    it('converts false to a string', () => {
      expect(create(false)).toBe('false');
    });

    // 3. Null and undefined
    it('converts null to a string', () => {
      expect(create(null)).toBe('null');
    });

    it('converts undefined to a string', () => {
      expect(create(undefined)).toBe('undefined');
    });

    // 4. Strings
    it('returns the same string when given a string', () => {
      expect(create('hello')).toBe('hello');
    });

    it('converts an empty string to an empty string', () => {
      expect(create('')).toBe('');
    });

    // 5. Objects and arrays
    it('converts an object to its string representation', () => {
      expect(create({})).toBe('[object Object]');
    });

    it('converts an array to a string', () => {
      expect(create([1, 2, 3])).toBe('1,2,3');
    });

    it('converts an empty array to an empty string', () => {
      expect(create([])).toBe('');
    });

    // 6. Objects with custom toString
    it('uses custom toString method if defined on an object', () => {
      const obj = { toString: () => 'custom' };
      expect(create(obj)).toBe('custom');
    });

    // 7. Symbols
    it('converts a symbol to a string', () => {
      expect(create(Symbol('test'))).toBe('Symbol(test)');
    });

    it('converts a symbol without description to a string', () => {
      expect(create(Symbol())).toBe('Symbol()');
    });

    // 8. BigInt
    it('converts a BigInt to a string', () => {
      expect(create(BigInt(123))).toBe('123');
    });

    // 9. Functions
    it('converts a function to its string representation', () => {
      function fn() {}
      expect(create(fn)).toContain('=>');
    });
  });
});
