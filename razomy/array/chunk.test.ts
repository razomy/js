import * as array from "@razomy/array";

describe('array', () => {
  describe('chunk', () => {
    // 1. Standard cases
    it('splits an array into chunks of the specified size', () => {
      expect(array.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('splits an array into even chunks when size divides evenly', () => {
      expect(array.chunk(['a', 'b', 'c', 'd', 'e', 'f'], 3)).toEqual([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
      ]);
    });

    it('returns the entire array as a single chunk when size is larger than array length', () => {
      expect(array.chunk([true, false], 5)).toEqual([[true, false]]);
    });

    it('returns each element as its own chunk when size is 1', () => {
      expect(array.chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });

    // 2. Empty array
    it('returns an empty array when given an empty array', () => {
      expect(array.chunk([], 3)).toEqual([]);
    });

    // 3. Single element array
    it('returns a single chunk for a single-element array', () => {
      expect(array.chunk([42], 1)).toEqual([[42]]);
      expect(array.chunk([42], 5)).toEqual([[42]]);
    });

    // 4. Size equals array length
    it('returns the entire array as one chunk when size equals array length', () => {
      expect(array.chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    });

    // 5. Last chunk is smaller
    it('produces a smaller last chunk when array length is not divisible by size', () => {
      expect(array.chunk([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    });

    // 6. Complex data types
    it('works correctly with arrays of objects', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(array.chunk(items, 2)).toEqual([[{ id: 1 }, { id: 2 }], [{ id: 3 }]]);
    });

    // 7. Does not mutate the original array
    it('does not mutate the original array', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      array.chunk(original, 2);
      expect(original).toEqual(originalCopy);
    });

    // 8. Returns new arrays (not references to the original)
    it('returns new sub-arrays that are independent of the original', () => {
      const original = [1, 2, 3, 4];
      const result = array.chunk(original, 2);
      result[0][0] = 99;
      expect(original[0]).toBe(1);
    });

    // 9. Large size
    it('handles a very large chunk size gracefully', () => {
      expect(array.chunk([1, 2, 3], 1000)).toEqual([[1, 2, 3]]);
    });

    // 10. Mixed types
    it('works with mixed-type arrays', () => {
      expect(array.chunk([1, 'a', true, null], 2)).toEqual([
        [1, 'a'],
        [true, null],
      ]);
    });
  });
});
