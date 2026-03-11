import {hasArray} from './has_array';

describe('array', () => {
  describe('hasArray', () => {
    // 1. Standard cases
    it('returns true when source contains all elements of sub array in order', () => {
      expect(hasArray([1, 2, 3, 4], [2, 4])).toBe(true);
    });

    it('returns false when elements are in reverse order', () => {
      expect(hasArray(['a', 'b', 'c'], ['c', 'a'])).toBe(false);
    });

    it('returns true when sub array is empty', () => {
      expect(hasArray([true, false], [])).toBe(true);
    });

    // 2. Edge cases with empty arrays
    it('returns true when both arrays are empty', () => {
      expect(hasArray([], [])).toBe(true);
    });

    it('returns false when source is empty but sub array is not', () => {
      expect(hasArray([], [1])).toBe(false);
    });

    // 3. Exact match
    it('returns true when source and sub array are identical', () => {
      expect(hasArray([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    // 4. Consecutive elements
    it('returns true for consecutive subsequence', () => {
      expect(hasArray([1, 2, 3, 4, 5], [2, 3, 4])).toBe(true);
    });

    // 5. Non-consecutive elements in correct order
    it('returns true for non-consecutive elements in correct order', () => {
      expect(hasArray([1, 2, 3, 4, 5], [1, 3, 5])).toBe(true);
    });

    // 6. Element not present in source
    it('returns false when sub array contains element not in source', () => {
      expect(hasArray([1, 2, 3], [1, 4])).toBe(false);
    });

    // 7. Duplicate elements
    it('returns true when duplicates exist and subsequence is valid', () => {
      expect(hasArray([1, 2, 1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it('returns false when not enough duplicates to satisfy subsequence', () => {
      expect(hasArray([1, 2, 3], [1, 1])).toBe(false);
    });

    it('handles repeated elements requiring correct offset tracking', () => {
      expect(hasArray([1, 1, 1, 2], [1, 1, 2])).toBe(true);
    });

    it('returns false when duplicates exist but order is wrong', () => {
      expect(hasArray([1, 2, 1], [2, 1, 2])).toBe(false);
    });

    // 8. Single element arrays
    it('returns true when single element sub array is found', () => {
      expect(hasArray([5], [5])).toBe(true);
    });

    it('returns false when single element sub array is not found', () => {
      expect(hasArray([5], [3])).toBe(false);
    });

    // 9. Sub array longer than source
    it('returns false when sub array is longer than source', () => {
      expect(hasArray([1, 2], [1, 2, 3])).toBe(false);
    });

    // 10. String elements
    it('works with string arrays', () => {
      expect(hasArray(['hello', 'world', 'foo', 'bar'], ['hello', 'foo'])).toBe(true);
      expect(hasArray(['hello', 'world', 'foo', 'bar'], ['foo', 'hello'])).toBe(false);
    });
  });
});

    