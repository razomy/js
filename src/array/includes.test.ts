import * as array from '@razomy/array';

describe('array', () => {
  describe('includes', () => {
    // 1. Standard cases
    it('returns true if the value is found in the array', () => {
      expect(array.includes([1, 2, 3], 1)).toBe(true);
    });

    it('returns false if the value is not found in the array', () => {
      expect(array.includes([1, 2, 3], 4)).toBe(false);
    });

    // 2. fromIndex parameter
    it('returns true if the value is found starting from the given index', () => {
      expect(array.includes(['a', 'b', 'c'], 'c', 1)).toBe(true);
    });

    it('returns false if the value exists only before the given fromIndex', () => {
      expect(array.includes([1, 2, 3], 1, 1)).toBe(false);
    });

    it('returns true if fromIndex is 0 and value is at the start', () => {
      expect(array.includes([1, 2, 3], 1, 0)).toBe(true);
    });

    it('handles negative fromIndex correctly', () => {
      expect(array.includes([1, 2, 3], 3, -1)).toBe(true);
      expect(array.includes([1, 2, 3], 1, -1)).toBe(false);
    });

    it('searches entire array if negative fromIndex exceeds array length', () => {
      expect(array.includes([1, 2, 3], 1, -10)).toBe(true);
    });

    it('returns false if fromIndex is equal to array length', () => {
      expect(array.includes([1, 2, 3], 3, 3)).toBe(false);
    });

    it('returns false if fromIndex is greater than array length', () => {
      expect(array.includes([1, 2, 3], 1, 10)).toBe(false);
    });

    // 3. Empty array
    it('returns false for an empty array', () => {
      expect(array.includes([], 1)).toBe(false);
    });

    it('returns false for an empty array with fromIndex', () => {
      expect(array.includes([], 1, 0)).toBe(false);
    });

    // 4. Different data types
    it('works with string arrays', () => {
      expect(array.includes(['hello', 'world'], 'world')).toBe(true);
      expect(array.includes(['hello', 'world'], 'foo')).toBe(false);
    });

    it('works with arrays of objects using reference equality', () => {
      const obj = { a: 1 };
      const arr = [obj, { b: 2 }];
      expect(array.includes(arr, obj)).toBe(true);
      expect(array.includes(arr, { a: 1 })).toBe(false);
    });

    it('works with boolean values', () => {
      expect(array.includes([true, false, true], false)).toBe(true);
      expect(array.includes([true, true], false)).toBe(false);
    });

    // 5. Special values
    it('handles NaN correctly', () => {
      expect(array.includes([1, NaN, 3], NaN)).toBe(true);
    });

    it('handles undefined values', () => {
      expect(array.includes([1, undefined, 3], undefined)).toBe(true);
      expect(array.includes([1, 2, 3], undefined)).toBe(false);
    });

    it('handles null values', () => {
      expect(array.includes([1, null, 3], null)).toBe(true);
      expect(array.includes([1, 2, 3], null)).toBe(false);
    });

    // 6. Duplicate values
    it('returns true if value appears multiple times', () => {
      expect(array.includes([1, 1, 1], 1)).toBe(true);
    });
  });
});
