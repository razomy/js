import * as array from "@razomy/array";

describe('array', () => {
  describe('isEmpty', () => {
    // 1. Empty arrays
    it('returns true for an empty array', () => {
      expect(array.isEmpty([])).toBe(true);
    });

    // 2. Non-empty arrays
    it('returns false for an array with one element', () => {
      expect(array.isEmpty([1])).toBe(false);
    });

    it('returns false for an array with multiple elements', () => {
      expect(array.isEmpty(['a', 'b'])).toBe(false);
    });

    // 3. Different data types
    it('returns false for an array of objects', () => {
      expect(array.isEmpty([{ name: 'Alice' }])).toBe(false);
    });

    it('returns false for an array containing undefined', () => {
      expect(array.isEmpty([undefined])).toBe(false);
    });

    it('returns false for an array containing null', () => {
      expect(array.isEmpty([null])).toBe(false);
    });

    it('returns false for an array containing an empty string', () => {
      expect(array.isEmpty([''])).toBe(false);
    });

    it('returns false for an array containing zero', () => {
      expect(array.isEmpty([0])).toBe(false);
    });

    // 4. Readonly arrays
    it('works correctly with readonly arrays', () => {
      const readonlyArray: readonly number[] = [];
      expect(array.isEmpty(readonlyArray)).toBe(true);

      const readonlyNonEmpty: readonly number[] = [1, 2, 3];
      expect(array.isEmpty(readonlyNonEmpty)).toBe(false);
    });

    // 5. Nested arrays
    it('returns false for an array containing an empty array', () => {
      expect(array.isEmpty([[]])).toBe(false);
    });
  });
});
