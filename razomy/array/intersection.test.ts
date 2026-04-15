import * as array from "@razomy/array";

describe('array', () => {
  describe('intersection', () => {
    // 1. Standard cases
    it('returns common elements between two number arrays', () => {
      expect(array.intersection([1, 2], [2, 3])).toEqual([2]);
    });

    it('returns common elements between two string arrays', () => {
      expect(array.intersection(['a', 'b'], ['a', 'c'])).toEqual(['a']);
    });

    it('returns an empty array when there are no common elements', () => {
      expect(array.intersection([1, 2], [3, 4])).toEqual([]);
    });

    it('returns all elements when both arrays are identical', () => {
      expect(array.intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('returns multiple common elements', () => {
      expect(array.intersection([1, 2, 3, 4], [2, 4, 6, 8])).toEqual([2, 4]);
    });

    // 2. Empty arrays
    it('returns an empty array when the source is empty', () => {
      expect(array.intersection([], [1, 2, 3])).toEqual([]);
    });

    it('returns an empty array when the target is empty', () => {
      expect(array.intersection([1, 2, 3], [])).toEqual([]);
    });

    it('returns an empty array when both arrays are empty', () => {
      expect(array.intersection([], [])).toEqual([]);
    });

    // 3. Uniqueness
    it('returns unique values even if source has duplicates', () => {
      expect(array.intersection([1, 1, 2, 2, 3], [1, 2])).toEqual([1, 2]);
    });

    it('returns unique values even if target has duplicates', () => {
      expect(array.intersection([1, 2], [2, 2, 2])).toEqual([2]);
    });

    it('returns unique values when both arrays have duplicates', () => {
      expect(array.intersection([1, 1, 2, 2], [2, 2, 3, 3])).toEqual([2]);
    });

    // 4. Order preservation
    it('preserves the order from the source array', () => {
      expect(array.intersection([3, 1, 2], [2, 3])).toEqual([3, 2]);
    });

    // 5. Single element arrays
    it('works with single element arrays that intersect', () => {
      expect(array.intersection([1], [1])).toEqual([1]);
    });

    it('works with single element arrays that do not intersect', () => {
      expect(array.intersection([1], [2])).toEqual([]);
    });

    // 6. Complex data types (reference equality)
    it('works with object references', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };
      expect(array.intersection([obj1, obj2], [obj2, obj3])).toEqual([obj2]);
    });

    it('does not match objects with same shape but different references', () => {
      expect(array.intersection([{ id: 1 }], [{ id: 1 }])).toEqual([]);
    });

    // 7. Mixed types (if applicable)
    it('handles arrays with mixed types', () => {
      expect(array.intersection([1, 'a', 2, 'b'], ['a', 2, 'c'] as (string | number)[])).toEqual(['a', 2]);
    });
  });
});
