import { sortByArrayMut } from './sort_by_array_mut';

describe('array', () => {
  describe('sortByArrayMut', () => {
    // 1. Standard cases
    it('sorts elements to match the order defined by newOrder', () => {
      expect(sortByArrayMut(['c', 'b', 'a'], ['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('sorts elements when newOrder has a different arrangement', () => {
      expect(sortByArrayMut(['x', 'y', 'z'], ['z', 'x', 'y'])).toEqual(['z', 'x', 'y']);
    });

    // 2. Elements not in newOrder are pushed to the end
    it('pushes elements not found in newOrder to the end', () => {
      expect(sortByArrayMut(['d', 'a', 'b'], ['b', 'a'])).toEqual(['b', 'a', 'd']);
    });

    it('preserves relative order of multiple elements not in newOrder', () => {
      expect(sortByArrayMut(['d', 'e', 'a', 'b'], ['b', 'a'])).toEqual(['b', 'a', 'd', 'e']);
    });

    // 3. Empty arrays
    it('returns an empty array when oldOrder is empty', () => {
      expect(sortByArrayMut([], ['a', 'b'])).toEqual([]);
    });

    it('returns oldOrder unchanged when newOrder is empty', () => {
      expect(sortByArrayMut(['c', 'b', 'a'], [])).toEqual(['c', 'b', 'a']);
    });

    it('returns an empty array when both arrays are empty', () => {
      expect(sortByArrayMut([], [])).toEqual([]);
    });

    // 4. Mutation behavior
    it('mutates the original oldOrder array in place', () => {
      const oldOrder = ['c', 'b', 'a'];
      const result = sortByArrayMut(oldOrder, ['a', 'b', 'c']);
      expect(result).toBe(oldOrder);
      expect(oldOrder).toEqual(['a', 'b', 'c']);
    });

    // 5. oldOrder and newOrder are identical
    it('returns the same order when oldOrder already matches newOrder', () => {
      expect(sortByArrayMut(['a', 'b', 'c'], ['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    // 6. newOrder has elements not present in oldOrder
    it('ignores elements in newOrder that are not in oldOrder', () => {
      expect(sortByArrayMut(['b', 'a'], ['x', 'a', 'y', 'b'])).toEqual(['a', 'b']);
    });

    // 7. Single element arrays
    it('handles single element oldOrder', () => {
      expect(sortByArrayMut(['a'], ['a'])).toEqual(['a']);
    });

    it('handles single element oldOrder not in newOrder', () => {
      expect(sortByArrayMut(['z'], ['a', 'b'])).toEqual(['z']);
    });

    // 8. Duplicate elements in oldOrder
    it('handles duplicate elements in oldOrder', () => {
      expect(sortByArrayMut(['b', 'a', 'b', 'a'], ['a', 'b'])).toEqual(['a', 'a', 'b', 'b']);
    });

    // 9. Partial overlap
    it('correctly sorts when only some elements are in newOrder', () => {
      expect(sortByArrayMut(['e', 'c', 'a', 'd', 'b'], ['a', 'c'])).toEqual(['a', 'c', 'e', 'd', 'b']);
    });
  });
});
