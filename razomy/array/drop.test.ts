import { drop } from './drop';

describe('array', () => {
  describe('drop', () => {
    // 1. Standard cases
    it('drops 1 element from the beginning', () => {
      expect(drop([1, 2, 3], 1)).toEqual([2, 3]);
    });

    it('drops 2 elements from the beginning', () => {
      expect(drop([1, 2, 3], 2)).toEqual([3]);
    });

    it('drops all elements when count equals array length', () => {
      expect(drop([1, 2, 3], 3)).toEqual([]);
    });

    it('returns an empty array when count exceeds array length', () => {
      expect(drop([1, 2, 3], 5)).toEqual([]);
    });

    // 2. Dropping zero elements
    it('returns a copy of the array when count is 0', () => {
      const array = [1, 2, 3];
      const result = drop(array, 0);
      expect(result).toEqual([1, 2, 3]);
      expect(result).not.toBe(array);
    });

    // 3. Empty array
    it('returns an empty array when the source array is empty', () => {
      expect(drop([], 0)).toEqual([]);
      expect(drop([], 3)).toEqual([]);
    });

    // // 4. Negative count
    // it('returns a start of the full array when count is negative', () => {
    //   expect(drop([1, 2, 3], -1)).toEqual([1, 2]);
    // });

    // 5. Does not mutate the original array
    it('does not mutate the original array', () => {
      const array = [1, 2, 3, 4];
      drop(array, 2);
      expect(array).toEqual([1, 2, 3, 4]);
    });

    // 6. Complex data types
    it('works correctly with arrays of objects', () => {
      const items = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ];
      expect(drop(items, 1)).toEqual([
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]);
    });

    // 7. Works with strings
    it('works correctly with arrays of strings', () => {
      expect(drop(['a', 'b', 'c', 'd'], 2)).toEqual(['c', 'd']);
    });

    // 8. Single element array
    it('returns an empty array when dropping 1 from a single-element array', () => {
      expect(drop([42], 1)).toEqual([]);
    });

    it('returns the single-element array when dropping 0', () => {
      expect(drop([42], 0)).toEqual([42]);
    });
  });
});
