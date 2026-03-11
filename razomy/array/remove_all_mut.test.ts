import { removeAllMut } from './remove_all_mut';

describe('array', () => {
  describe('removeAllMut', () => {
    // 1. Standard cases
    it('removes specified values from the array', () => {
      const array = [1, 2, 3, 4];
      removeAllMut(array, [1, 3]);
      expect(array).toEqual([2, 4]);
    });

    it('removes multiple occurrences when specified multiple times in values', () => {
      const array = ['a', 'b', 'b', 'c'];
      removeAllMut(array, ['b', 'b']);
      expect(array).toEqual(['a', 'c']);
    });

    it('removes only the first matching instance per value entry', () => {
      const array = [1, 1, 2];
      removeAllMut(array, [1]);
      expect(array).toEqual([1, 2]);
    });

    // 2. Empty arrays
    it('does nothing when the array is empty', () => {
      const array: number[] = [];
      removeAllMut(array, [1, 2, 3]);
      expect(array).toEqual([]);
    });

    it('does nothing when the values array is empty', () => {
      const array = [1, 2, 3];
      removeAllMut(array, []);
      expect(array).toEqual([1, 2, 3]);
    });

    it('does nothing when both arrays are empty', () => {
      const array: number[] = [];
      removeAllMut(array, []);
      expect(array).toEqual([]);
    });

    // 3. Values not found in the array
    it('does not modify the array when values are not present', () => {
      const array = [1, 2, 3];
      removeAllMut(array, [4, 5]);
      expect(array).toEqual([1, 2, 3]);
    });

    it('removes only matching values and ignores non-matching ones', () => {
      const array = [1, 2, 3, 4];
      removeAllMut(array, [2, 5, 4]);
      expect(array).toEqual([1, 3]);
    });

    // 4. Mutates the original array
    it('mutates the original array in place', () => {
      const array = [10, 20, 30];
      const reference = array;
      removeAllMut(array, [20]);
      expect(array).toBe(reference);
      expect(array).toEqual([10, 30]);
    });

    // 5. Returns void
    it('returns undefined', () => {
      const array = [1, 2, 3];
      const result = removeAllMut(array, [1]);
      expect(result).toBeUndefined();
    });

    // 6. Removing all elements
    it('removes all elements when values contain all elements', () => {
      const array = [1, 2, 3];
      removeAllMut(array, [1, 2, 3]);
      expect(array).toEqual([]);
    });

    // 7. Duplicate values in array with fewer removals
    it('removes only as many instances as specified in values', () => {
      const array = [5, 5, 5, 5];
      removeAllMut(array, [5, 5]);
      expect(array).toEqual([5, 5]);
    });

    // 8. Complex data types with reference equality
    it('works with object references', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };
      const array = [obj1, obj2, obj3];
      removeAllMut(array, [obj1, obj3]);
      expect(array).toEqual([obj2]);
    });
  });
});
