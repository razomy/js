import { uniq } from './uniq';

describe('array', () => {
  describe('uniq', () => {
    // 1. Standard cases
    it('removes duplicate numbers', () => {
      expect(uniq([1, 2, 1])).toEqual([1, 2]);
    });

    it('removes duplicate strings', () => {
      expect(uniq(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });

    it('distinguishes between different types with same value', () => {
      expect(uniq([1, '1', 1])).toEqual([1, '1']);
    });

    // 2. Empty array
    it('returns an empty array for an empty input', () => {
      expect(uniq([])).toEqual([]);
    });

    // 3. No duplicates
    it('returns the same elements when there are no duplicates', () => {
      expect(uniq([1, 2, 3])).toEqual([1, 2, 3]);
    });

    // 4. All duplicates
    it('returns a single element when all elements are the same', () => {
      expect(uniq([5, 5, 5, 5])).toEqual([5]);
    });

    // 5. Preserves order of first occurrence
    it('preserves the order of first occurrence', () => {
      expect(uniq([3, 1, 2, 1, 3, 2])).toEqual([3, 1, 2]);
    });

    // 6. Single element
    it('returns the same array for a single element', () => {
      expect(uniq([42])).toEqual([42]);
    });

    // 7. Mixed types
    it('handles mixed types correctly', () => {
      expect(uniq([true, false, true, 1, 0])).toEqual([true, false, 1, 0]);
    });

    // 8. Reference types (objects are compared by reference)
    it('does not deduplicate objects with same shape (different references)', () => {
      const a = { id: 1 };
      const b = { id: 1 };
      expect(uniq([a, b])).toEqual([a, b]);
    });

    it('deduplicates objects with the same reference', () => {
      const a = { id: 1 };
      expect(uniq([a, a, a])).toEqual([a]);
    });

    // 9. Special values
    it('handles NaN correctly (Set treats all NaNs as equal)', () => {
      expect(uniq([NaN, NaN, 1])).toEqual([NaN, 1]);
    });

    it('handles undefined and null', () => {
      expect(uniq([undefined, null, undefined, null])).toEqual([undefined, null]);
    });

    // 10. Returns a new array
    it('returns a new array instance', () => {
      const input = [1, 2, 3];
      const result = uniq(input);
      expect(result).not.toBe(input);
      expect(result).toEqual([1, 2, 3]);
    });

    // 11. Large array with many duplicates
    it('handles large arrays efficiently', () => {
      const input = Array.from({ length: 10000 }, (_, i) => i % 100);
      const result = uniq(input);
      expect(result).toHaveLength(100);
      expect(result).toEqual(Array.from({ length: 100 }, (_, i) => i));
    });
  });
});