import * as array from '@razomy/array';

describe('array', () => {
  describe('removeLast', () => {
    // 1. Standard cases
    it('removes the last element by default', () => {
      expect(array.removeLast([1, 2, 3])).toEqual([1, 2]);
    });

    it('removes the last element when deltaIndex is 0', () => {
      expect(array.removeLast(['a', 'b', 'c', 'd'], 0)).toEqual(['a', 'b', 'c']);
    });

    it('removes additional elements with negative deltaIndex', () => {
      expect(array.removeLast([1, 2, 3], -1)).toEqual([1]);
    });

    it('removes multiple additional elements with larger negative deltaIndex', () => {
      expect(array.removeLast([1, 2, 3, 4, 5], -2)).toEqual([1, 2]);
    });

    // 2. Edge cases with empty arrays
    it('returns an empty array when given an empty array', () => {
      expect(array.removeLast([])).toEqual([]);
    });

    it('returns an empty array when given an empty array with deltaIndex', () => {
      expect(array.removeLast([], -1)).toEqual([]);
    });

    // 3. Single-element arrays
    it('returns an empty array when removing last from a single-element array', () => {
      expect(array.removeLast([1])).toEqual([]);
    });

    it('returns an empty array when removing last from single-element with negative deltaIndex', () => {
      expect(array.removeLast([1], -1)).toEqual([]);
    });

    // 4. deltaIndex that removes all elements
    it('returns an empty array when deltaIndex removes all elements', () => {
      expect(array.removeLast([1, 2, 3], -2)).toEqual([]);
    });

    it('returns an empty array when deltaIndex exceeds array length', () => {
      expect(array.removeLast([1, 2, 3], -10)).toEqual([]);
    });

    // 5. Two-element array
    it('removes the last element from a two-element array', () => {
      expect(array.removeLast([1, 2])).toEqual([1]);
    });

    // 6. Positive deltaIndex (keeps more elements, effectively removes fewer)
    it('handles positive deltaIndex by keeping more elements', () => {
      // end = 3 - 1 + 1 = 3, slice(0, 3) => [1, 2, 3]
      expect(array.removeLast([1, 2, 3], 1)).toEqual([1, 2, 3]);
    });

    it('handles positive deltaIndex that exceeds array length', () => {
      // end = 3 - 1 + 5 = 7, slice(0, 7) => [1, 2, 3]
      expect(array.removeLast([1, 2, 3], 5)).toEqual([1, 2, 3]);
    });

    // 7. Does not mutate original array
    it('returns a new array and does not mutate the original', () => {
      const original = [1, 2, 3];
      const result = array.removeLast(original);
      expect(result).toEqual([1, 2]);
      expect(original).toEqual([1, 2, 3]);
      expect(result).not.toBe(original);
    });

    // 8. Complex data types
    it('works with arrays of objects', () => {
      const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(array.removeLast(arr)).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('works with arrays of strings', () => {
      expect(array.removeLast(['hello', 'world', 'foo'])).toEqual(['hello', 'world']);
    });
  });
});
