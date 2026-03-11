import { tryFirstEqual } from './try_first_equal';

describe('array', () => {
  describe('tryFirstEqual', () => {
    // 1. Standard cases
    it('returns the first element from array2 that exists in array1', () => {
      expect(tryFirstEqual([1, 2, 3], [4, 2, 3])).toBe(2);
    });

    it('returns the first match based on array2 order, not array1 order', () => {
      expect(tryFirstEqual([10, 20, 30], [30, 20, 10])).toBe(30);
    });

    it('returns null if no elements match', () => {
      expect(tryFirstEqual(['a', 'b'], ['c', 'd'])).toBeNull();
    });

    // 2. Empty arrays
    it('returns null if array1 is empty', () => {
      expect(tryFirstEqual([], [1, 2, 3])).toBeNull();
    });

    it('returns null if array2 is empty', () => {
      expect(tryFirstEqual([1, 2, 3], [])).toBeNull();
    });

    it('returns null if both arrays are empty', () => {
      expect(tryFirstEqual([], [])).toBeNull();
    });

    // 3. Single element arrays
    it('returns the element if both arrays contain the same single element', () => {
      expect(tryFirstEqual([5], [5])).toBe(5);
    });

    it('returns null if single element arrays differ', () => {
      expect(tryFirstEqual([5], [6])).toBeNull();
    });

    // 4. Strict equality
    it('uses strict equality and does not coerce types', () => {
      expect(tryFirstEqual([1, 2, 3] as any[], ['1', '2', '3'] as any[])).toBeNull();
    });

    it('matches by reference for objects (strict equality)', () => {
      const obj1 = { a: 1 };
      const obj2 = { a: 1 };
      const obj3 = obj1;
      expect(tryFirstEqual([obj1], [obj2])).toBeNull();
      expect(tryFirstEqual([obj1], [obj3])).toBe(obj1);
    });

    // 5. Multiple matches - returns the first from array2
    it('returns the first match from array2 when multiple matches exist', () => {
      expect(tryFirstEqual([1, 2, 3], [3, 2, 1])).toBe(3);
    });

    // 6. Duplicate elements
    it('handles duplicates in array2 correctly', () => {
      expect(tryFirstEqual([2], [1, 2, 2, 3])).toBe(2);
    });

    it('handles duplicates in array1 correctly', () => {
      expect(tryFirstEqual([2, 2, 2], [1, 3, 2])).toBe(2);
    });

    // 7. Various types
    it('works with strings', () => {
      expect(tryFirstEqual(['foo', 'bar'], ['baz', 'bar', 'foo'])).toBe('bar');
    });

    it('works with boolean values', () => {
      expect(tryFirstEqual([true], [false, true])).toBe(true);
    });

    it('works with null and undefined values in arrays', () => {
      expect(tryFirstEqual([null, undefined], [undefined, null])).toBe(undefined);
    });

    // 8. Short-circuiting behavior
    it('returns on the first match without checking the rest of array2', () => {
      expect(tryFirstEqual([1, 2, 3, 4, 5], [6, 7, 3, 4, 5])).toBe(3);
    });
  });
});
