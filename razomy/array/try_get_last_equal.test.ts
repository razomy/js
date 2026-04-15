import * as array from "@razomy/array";

describe('array', () => {
  describe('tryGetLastEqual', () => {
    // 1. Standard cases
    it('returns the last matching pair when a match exists', () => {
      expect(array.tryGetLastEqual([1, 2, 3], [3, 4, 5], (a, b) => a === b)).toEqual([3, 3]);
    });

    it('returns the last matching pair with case-insensitive string comparison', () => {
      expect(array.tryGetLastEqual(['a', 'b'], ['A', 'B'], (a, b) => a.toUpperCase() === b)).toEqual(['b', 'B']);
    });

    it('returns null when no match is found', () => {
      expect(array.tryGetLastEqual([1, 2], [3, 4], (a, b) => a === b)).toBeNull();
    });

    // 2. Empty arrays
    it('returns null when the first array is empty', () => {
      expect(array.tryGetLastEqual([], [1, 2, 3], (a, b) => a === b)).toBeNull();
    });

    it('returns null when the second array is empty', () => {
      expect(array.tryGetLastEqual([1, 2, 3], [], (a, b) => a === b)).toBeNull();
    });

    it('returns null when both arrays are empty', () => {
      expect(array.tryGetLastEqual([], [], (a, b) => a === b)).toBeNull();
    });

    // 3. Multiple matches - returns the last from arrayA with the last from arrayB
    it('returns the last element from arrayA that matches, paired with the last matching element from arrayB', () => {
      expect(array.tryGetLastEqual([1, 2, 3, 2], [2, 5, 2], (a, b) => a === b)).toEqual([2, 2]);
    });

    it('prioritizes elements later in arrayA over earlier ones', () => {
      expect(array.tryGetLastEqual([1, 2, 1], [1, 3], (a, b) => a === b)).toEqual([1, 1]);
    });

    it('for the same arrayA element, prioritizes the last match in arrayB', () => {
      expect(array.tryGetLastEqual([5], [5, 5, 5], (a, b) => a === b)).toEqual([5, 5]);
    });

    // 4. Single element arrays
    it('returns a match with single-element arrays that match', () => {
      expect(array.tryGetLastEqual([42], [42], (a, b) => a === b)).toEqual([42, 42]);
    });

    it('returns null with single-element arrays that do not match', () => {
      expect(array.tryGetLastEqual([1], [2], (a, b) => a === b)).toBeNull();
    });

    // 5. Complex data types
    it('works with objects using a custom predicate', () => {
      const arrayA = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const arrayB = [{ id: 2 }, { id: 3 }, { id: 4 }];
      const result = array.tryGetLastEqual(arrayA, arrayB, (a, b) => a.id === b.id);
      expect(result).toEqual([{ id: 3 }, { id: 3 }]);
    });

    // 6. Different types for arrayA and arrayB
    it('works with different types for the two arrays', () => {
      const arrayA = [1, 2, 3];
      const arrayB = ['1', '2', '3'];
      const result = array.tryGetLastEqual(arrayA, arrayB, (a, b) => String(a) === b);
      expect(result).toEqual([3, '3']);
    });
  });
});
