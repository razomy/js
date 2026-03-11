import { union } from './union';

describe('array', () => {
  describe('union', () => {
    // 1. Standard cases
    it('returns unique values from two arrays', () => {
      expect(union([2], [1, 2])).toEqual([2, 1]);
    });

    it('returns unique values from multiple arrays', () => {
      expect(union(['a'], ['b'], ['a'])).toEqual(['a', 'b']);
    });

    it('combines two arrays removing duplicates', () => {
      expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
    });

    // 2. Preserves order of first occurrence
    it('preserves the order of first occurrence', () => {
      expect(union([3, 1, 2], [2, 4, 1])).toEqual([3, 1, 2, 4]);
    });

    // 3. Empty arrays
    it('returns an empty array when no arrays are provided', () => {
      expect(union()).toEqual([]);
    });

    it('returns an empty array when all input arrays are empty', () => {
      expect(union([], [], [])).toEqual([]);
    });

    it('returns the unique values of a single non-empty array when combined with empty arrays', () => {
      expect(union([1, 2, 3], [])).toEqual([1, 2, 3]);
      expect(union([], [1, 2, 3])).toEqual([1, 2, 3]);
    });

    // 4. Single array
    it('returns unique values from a single array', () => {
      expect(union([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it('returns the same array if all elements are already unique', () => {
      expect(union([1, 2, 3])).toEqual([1, 2, 3]);
    });

    // 5. All duplicates across arrays
    it('returns a single element when all arrays contain the same value', () => {
      expect(union([1], [1], [1], [1])).toEqual([1]);
    });

    // 6. No overlapping elements
    it('returns all elements when there are no duplicates across arrays', () => {
      expect(union([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    // 7. Complex data types (reference equality)
    it('treats different object references as distinct values', () => {
      const obj1 = { a: 1 };
      const obj2 = { a: 1 };
      expect(union([obj1], [obj2])).toEqual([obj1, obj2]);
    });

    it('deduplicates the same object reference across arrays', () => {
      const obj = { a: 1 };
      expect(union([obj], [obj])).toEqual([obj]);
    });

    // 8. Mixed types
    it('works with mixed types', () => {
      expect(union([1, 'a'], ['a', 2])).toEqual([1, 'a', 2]);
    });

    // 9. Many arrays
    it('handles many arrays', () => {
      expect(union([1], [2], [3], [4], [5])).toEqual([1, 2, 3, 4, 5]);
    });

    // 10. Boolean and falsy values
    it('handles falsy values correctly', () => {
      expect(union([0, false, ''], [null, undefined, 0])).toEqual([0, false, '', null, undefined]);
    });
  });
});