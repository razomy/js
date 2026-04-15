import * as array from '@razomy/array';

describe('array', () => {
  describe('sortByArrayMut', () => {
    // 1. Standard cases
    it('sorts elements to match the order defined by newOrder', () => {
      expect(array.sortByArrayMut(['c', 'b', 'a'], ['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('sorts elements when newOrder has a different arrangement', () => {
      expect(array.sortByArrayMut(['x', 'y', 'z'], ['z', 'x', 'y'])).toEqual(['z', 'x', 'y']);
    });

    // 2. Elements not in newOrder are pushed to the end
    it('pushes elements not found in newOrder to the end', () => {
      expect(array.sortByArrayMut(['d', 'a', 'b'], ['b', 'a'])).toEqual(['b', 'a', 'd']);
    });

    it('preserves relative order of multiple elements not in newOrder', () => {
      expect(array.sortByArrayMut(['d', 'e', 'a', 'b'], ['b', 'a'])).toEqual(['b', 'a', 'd', 'e']);
    });

    // 3. Empty arrays
    it('returns an empty array when oldOrder is empty', () => {
      expect(array.sortByArrayMut([], ['a', 'b'])).toEqual([]);
    });

    it('returns oldOrder unchanged when newOrder is empty', () => {
      expect(array.sortByArrayMut(['c', 'b', 'a'], [])).toEqual(['c', 'b', 'a']);
    });

    it('returns an empty array when both arrays are empty', () => {
      expect(array.sortByArrayMut([], [])).toEqual([]);
    });

    // 4. Mutation behavior
    it('mutates the original oldOrder array in place', () => {
      const oldOrder = ['c', 'b', 'a'];
      const result = array.sortByArrayMut(oldOrder, ['a', 'b', 'c']);
      expect(result).toBe(oldOrder);
      expect(oldOrder).toEqual(['a', 'b', 'c']);
    });

    // 5. oldOrder and newOrder are identical
    it('returns the same order when oldOrder already matches newOrder', () => {
      expect(array.sortByArrayMut(['a', 'b', 'c'], ['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    // 6. newOrder has elements not present in oldOrder
    it('ignores elements in newOrder that are not in oldOrder', () => {
      expect(array.sortByArrayMut(['b', 'a'], ['x', 'a', 'y', 'b'])).toEqual(['a', 'b']);
    });

    // 7. Single element arrays
    it('handles single element oldOrder', () => {
      expect(array.sortByArrayMut(['a'], ['a'])).toEqual(['a']);
    });

    it('handles single element oldOrder not in newOrder', () => {
      expect(array.sortByArrayMut(['z'], ['a', 'b'])).toEqual(['z']);
    });

    // 8. Duplicate elements in oldOrder
    it('handles duplicate elements in oldOrder', () => {
      expect(array.sortByArrayMut(['b', 'a', 'b', 'a'], ['a', 'b'])).toEqual(['a', 'a', 'b', 'b']);
    });

    // 9. Partial overlap
    it('correctly sorts when only some elements are in newOrder', () => {
      expect(array.sortByArrayMut(['e', 'c', 'a', 'd', 'b'], ['a', 'c'])).toEqual(['a', 'c', 'e', 'd', 'b']);
    });
  });
});
