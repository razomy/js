import { take } from './take';

describe('array', () => {
  describe('take', () => {
    // 1. Standard cases
    it('takes 1 element from the beginning', () => {
      expect(take([1, 2, 3], 1)).toEqual([1]);
    });

    it('takes 2 elements from the beginning', () => {
      expect(take([1, 2, 3], 2)).toEqual([1, 2]);
    });

    it('takes all elements when n equals array length', () => {
      expect(take([1, 2, 3], 3)).toEqual([1, 2, 3]);
    });

    // 2. n greater than array length
    it('returns the entire array when n exceeds array length', () => {
      expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
    });

    // 3. n is zero
    it('returns an empty array when n is 0', () => {
      expect(take([1, 2, 3], 0)).toEqual([]);
    });

    // 4. Negative n
    it('returns an end array when n is negative', () => {
      expect(take([1, 2, 3], -1)).toEqual([1, 2]);
    });

    // 5. Empty array
    it('returns an empty array when the input array is empty', () => {
      expect(take([], 3)).toEqual([]);
    });

    it('returns an empty array when both array is empty and n is 0', () => {
      expect(take([], 0)).toEqual([]);
    });

    // 6. Does not mutate the original array
    it('does not mutate the original array', () => {
      const original = [1, 2, 3];
      const result = take(original, 2);
      expect(result).toEqual([1, 2]);
      expect(original).toEqual([1, 2, 3]);
    });

    // 7. Returns a new array reference
    it('returns a new array, not the same reference', () => {
      const original = [1, 2, 3];
      const result = take(original, 3);
      expect(result).toEqual(original);
      expect(result).not.toBe(original);
    });

    // 8. Complex data types
    it('works correctly with arrays of objects', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(take(items, 2)).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('works correctly with arrays of strings', () => {
      expect(take(['a', 'b', 'c', 'd'], 3)).toEqual(['a', 'b', 'c']);
    });

    // 9. Single element array
    it('works correctly with a single element array', () => {
      expect(take([42], 1)).toEqual([42]);
      expect(take([42], 5)).toEqual([42]);
      expect(take([42], 0)).toEqual([]);
    });
  });
});