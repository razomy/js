import {sortByFrequencyAndUnique} from './sort_by_frequency_and_unique';

describe('array', () => {
  describe('sortByFrequencyAndUnique', () => {
    // 1. Standard cases
    it('sorts by frequency in descending order and returns unique values', () => {
      expect(sortByFrequencyAndUnique([1, 2, 2, 2, 1])).toEqual([2, 1]);
    });

    it('sorts strings by frequency in descending order', () => {
      expect(sortByFrequencyAndUnique(['a', 'a', 'a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('sorts numbers by frequency in descending order', () => {
      expect(sortByFrequencyAndUnique([10, 20, 10, 10, 20])).toEqual([10, 20]);
    });

    // 2. Empty array
    it('returns an empty array when given an empty array', () => {
      expect(sortByFrequencyAndUnique([])).toEqual([]);
    });

    // 3. Single element
    it('returns single element array when given a single element', () => {
      expect(sortByFrequencyAndUnique([42])).toEqual([42]);
    });

    // 4. All elements are the same
    it('returns a single element when all elements are identical', () => {
      expect(sortByFrequencyAndUnique([5, 5, 5, 5])).toEqual([5]);
    });

    // 5. All elements have the same frequency
    it('returns unique elements when all have equal frequency', () => {
      const result = sortByFrequencyAndUnique([1, 2, 3]);
      expect(result).toHaveLength(3);
      expect(result).toContain(1);
      expect(result).toContain(2);
      expect(result).toContain(3);
    });

    // 6. Multiple elements with same frequency (tie-breaking)
    it('handles elements with tied frequencies', () => {
      const result = sortByFrequencyAndUnique([1, 1, 2, 2, 3]);
      // 1 and 2 both appear twice, 3 appears once
      expect(result).toHaveLength(3);
      // 3 should be last since it has the lowest frequency
      expect(result[2]).toBe(3);
      // 1 and 2 should come before 3
      expect(result.slice(0, 2).sort()).toEqual([1, 2]);
    });

    // 7. Strings
    it('works with string arrays', () => {
      expect(sortByFrequencyAndUnique(['x', 'y', 'x', 'z', 'x', 'y'])).toEqual(['x', 'y', 'z']);
    });

    // 8. Preserves uniqueness
    it('removes duplicates from the result', () => {
      const result = sortByFrequencyAndUnique([3, 3, 3, 1, 1, 2]);
      expect(result).toEqual([3, 1, 2]);
      // Ensure no duplicates
      expect(new Set(result).size).toBe(result.length);
    });

    // 9. Large variety of frequencies
    it('correctly orders elements with various frequencies', () => {
      // 4 appears 4 times, 3 appears 3 times, 2 appears 2 times, 1 appears 1 time
      const result = sortByFrequencyAndUnique([1, 2, 2, 3, 3, 3, 4, 4, 4, 4]);
      expect(result).toEqual([4, 3, 2, 1]);
    });
  });
});
