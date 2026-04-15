import * as array from "@razomy/array";

describe('array', () => {
  describe('reverse', () => {
    // 1. Standard cases
    it('reverses an array of numbers', () => {
      expect(array.reverse([1, 2, 3])).toEqual([3, 2, 1]);
    });

    it('reverses an array of strings', () => {
      expect(array.reverse(['y', 'z'])).toEqual(['z', 'y']);
    });

    it('reverses an array with multiple elements', () => {
      expect(array.reverse([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1]);
    });

    // 2. Empty array
    it('returns an empty array when given an empty array', () => {
      expect(array.reverse([])).toEqual([]);
    });

    // 3. Single element
    it('returns the same single-element array when given an array with one element', () => {
      expect(array.reverse([42])).toEqual([42]);
    });

    // 4. Does not mutate the original array
    it('does not mutate the original array', () => {
      const original = [1, 2, 3];
      const result = array.reverse(original);
      expect(result).toEqual([3, 2, 1]);
      expect(original).toEqual([1, 2, 3]);
    });

    // 5. Returns a new array reference
    it('returns a new array, not the same reference', () => {
      const original = [1, 2, 3];
      const result = array.reverse(original);
      expect(result).not.toBe(original);
    });

    // 6. Complex data types
    it('works correctly with arrays of objects', () => {
      const a = { name: 'Alice' };
      const b = { name: 'Bob' };
      const c = { name: 'Charlie' };
      expect(array.reverse([a, b, c])).toEqual([c, b, a]);
    });

    // 7. Mixed types
    it('works correctly with mixed types', () => {
      expect(array.reverse([1, 'two', 3, 'four'])).toEqual(['four', 3, 'two', 1]);
    });

    // 8. Two elements
    it('correctly reverses a two-element array', () => {
      expect(array.reverse([true, false])).toEqual([false, true]);
    });

    // 9. Preserves duplicates
    it('preserves duplicate elements in reversed order', () => {
      expect(array.reverse([1, 1, 2, 2, 3])).toEqual([3, 2, 2, 1, 1]);
    });

    // 10. Palindromic array
    it('returns an equal array when the input is a palindrome', () => {
      expect(array.reverse([1, 2, 3, 2, 1])).toEqual([1, 2, 3, 2, 1]);
    });
  });
});
