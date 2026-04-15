import * as array from "@razomy/array";

describe('array', () => {
  describe('difference', () => {
    // 1. Standard cases
    it('returns elements in source that are not in other', () => {
      expect(array.difference([1, 2, 3], [2, 4])).toEqual([1, 3]);
    });

    it('returns elements unique to the source with strings', () => {
      expect(array.difference(['apple', 'banana', 'orange'], ['orange', 'grape'])).toEqual(['apple', 'banana']);
    });

    it('removes multiple elements from the middle', () => {
      expect(array.difference([1, 2, 3, 4, 5], [2, 3, 4])).toEqual([1, 5]);
    });

    // 2. Empty arrays
    it('returns an empty array when source is empty', () => {
      expect(array.difference([], [1, 2, 3])).toEqual([]);
    });

    it('returns a copy of source when other is empty', () => {
      expect(array.difference([1, 2, 3], [])).toEqual([1, 2, 3]);
    });

    it('returns an empty array when both arrays are empty', () => {
      expect(array.difference([], [])).toEqual([]);
    });

    // 3. No overlap
    it('returns all source elements when there is no overlap', () => {
      expect(array.difference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3]);
    });

    // 4. Complete overlap
    it('returns an empty array when all source elements are in other', () => {
      expect(array.difference([1, 2, 3], [1, 2, 3])).toEqual([]);
    });

    it('returns an empty array when other is a superset of source', () => {
      expect(array.difference([1, 2], [1, 2, 3, 4])).toEqual([]);
    });

    // 5. Duplicate elements in source
    it('preserves duplicate elements in source that are not in other', () => {
      expect(array.difference([1, 1, 2, 3, 3], [2])).toEqual([1, 1, 3, 3]);
    });

    it('removes all occurrences of duplicates that appear in other', () => {
      expect(array.difference([1, 1, 2, 2, 3], [1, 2])).toEqual([3]);
    });

    // 6. Duplicate elements in other
    it('handles duplicates in other array correctly', () => {
      expect(array.difference([1, 2, 3], [2, 2, 2])).toEqual([1, 3]);
    });

    // 7. Order preservation
    it('preserves the order of elements from the source array', () => {
      expect(array.difference([5, 3, 1, 4, 2], [3, 4])).toEqual([5, 1, 2]);
    });

    // 8. Returns a new array (immutability)
    it('returns a new array and does not mutate the source', () => {
      const source = [1, 2, 3];
      const other = [2];
      const result = array.difference(source, other);

      expect(result).toEqual([1, 3]);
      expect(source).toEqual([1, 2, 3]);
      expect(result).not.toBe(source);
    });

    it('does not mutate the other array', () => {
      const other = [2, 3];
      array.difference([1, 2, 3, 4], other);
      expect(other).toEqual([2, 3]);
    });

    // 9. Reference types
    it('compares by reference for objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };

      expect(array.difference([obj1, obj2, obj3], [obj2])).toEqual([obj1, obj3]);
    });
  });
});
