import * as array from '@razomy/array';

describe('array', () => {
  describe('zip', () => {
    // 1. Standard cases
    it('zips two arrays of equal length', () => {
      expect(array.zip(['a', 'b'], ['1', '2'])).toEqual([
        ['a', '1'],
        ['b', '2'],
      ]);
    });

    it('zips three arrays of equal length', () => {
      expect(array.zip([1, 2, 3], [4, 5, 6], [7, 8, 9])).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
    });

    // 2. Arrays of different lengths (truncates to shortest)
    it('truncates to the length of the shortest array', () => {
      expect(array.zip(['a', 'b'], ['1'])).toEqual([['a', '1']]);
    });

    it('truncates when second array is longer', () => {
      expect(array.zip(['a'], ['1', '2', '3'])).toEqual([['a', '1']]);
    });

    it('truncates to shortest among multiple arrays', () => {
      expect(array.zip([1, 2, 3], [4, 5], [7, 8, 9, 10])).toEqual([
        [1, 4, 7],
        [2, 5, 8],
      ]);
    });

    // 3. Empty arrays
    it('returns empty array when first array is empty', () => {
      expect(array.zip([], [1, 2])).toEqual([]);
    });

    it('returns empty array when second array is empty', () => {
      expect(array.zip(['a', 'b'], [])).toEqual([]);
    });

    it('returns empty array when all arrays are empty', () => {
      expect(array.zip([], [], [])).toEqual([]);
    });

    // 4. No arguments
    it('returns empty array when called with no arguments', () => {
      expect(array.zip()).toEqual([]);
    });

    // 5. Single array
    it('wraps each element in an array when given a single array', () => {
      expect(array.zip([1, 2, 3])).toEqual([[1], [2], [3]]);
    });

    // 6. Single element arrays
    it('zips single element arrays', () => {
      expect(array.zip(['a'], ['1'])).toEqual([['a', '1']]);
    });

    // 7. Complex data types
    it('works with arrays of objects', () => {
      const a = [{ name: 'Alice' }, { name: 'Bob' }];
      const b = [{ age: '30' }, { age: '25' }];
      expect(array.zip<object>(a, b)).toEqual([
        [{ name: 'Alice' }, { age: '30' }],
        [{ name: 'Bob' }, { age: '25' }],
      ]);
    });

    // 8. Mixed types
    it('works with mixed types in a single zip', () => {
      const result = array.zip(['a', 'b', 'c'], ['1', '2', '3']);
      expect(result).toEqual([
        ['a', '1'],
        ['b', '2'],
        ['c', '3'],
      ]);
    });

    // 9. Does not mutate input arrays
    it('does not mutate the original arrays', () => {
      const a = [1, 2, 3];
      const b = [4, 5, 6];
      array.zip(a, b);
      expect(a).toEqual([1, 2, 3]);
      expect(b).toEqual([4, 5, 6]);
    });

    // 10. Many arrays
    it('zips many arrays together', () => {
      expect(array.zip([1], [2], [3], [4], [5])).toEqual([[1, 2, 3, 4, 5]]);
    });
  });
});
