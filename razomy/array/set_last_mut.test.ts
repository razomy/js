import * as array from "@razomy/array";

describe('array', () => {
  describe('setLastMut', () => {
    // 1. Standard cases
    it('sets the last element of a numeric array', () => {
      expect(array.setLastMut([1, 2, 3], 4)).toEqual([1, 2, 4]);
    });

    it('sets the last element of a string array', () => {
      expect(array.setLastMut(['a', 'b'], 'c')).toEqual(['a', 'c']);
    });

    // 2. Offset cases
    it('sets the second-to-last element with offset -1', () => {
      expect(array.setLastMut([1, 2, 3], 5, -1)).toEqual([1, 5, 3]);
    });

    it('sets the first element with a negative offset equal to -(length - 1)', () => {
      expect(array.setLastMut([1, 2, 3], 9, -2)).toEqual([9, 2, 3]);
    });

    it('sets a value beyond the array length with a positive offset', () => {
      const arr = [1, 2, 3];
      const result = array.setLastMut(arr, 10, 1);
      expect(result[3]).toBe(10);
      expect(result.length).toBe(4);
    });

    // 3. Mutability
    it('mutates the original array in place', () => {
      const arr = [1, 2, 3];
      const result = array.setLastMut(arr, 99);
      expect(result).toBe(arr);
      expect(arr).toEqual([1, 2, 99]);
    });

    it('returns the same reference as the input array', () => {
      const arr = ['x', 'y', 'z'];
      const result = array.setLastMut(arr, 'w');
      expect(result).toBe(arr);
    });

    // 4. Single element array
    it('sets the only element when array has one element', () => {
      expect(array.setLastMut([42], 100)).toEqual([100]);
    });

    it('sets the only element with offset 0', () => {
      expect(array.setLastMut([42], 100, 0)).toEqual([100]);
    });

    // 5. Default offset
    it('uses offset 0 by default', () => {
      const arr = [10, 20, 30];
      array.setLastMut(arr, 40);
      expect(arr).toEqual([10, 20, 40]);
    });

    // 6. Complex data types
    it('works with arrays of objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };
      const result = array.setLastMut([obj1, obj2], obj3);
      expect(result).toEqual([{ id: 1 }, { id: 3 }]);
    });

    // 7. Edge case: offset beyond beginning of array
    it('sets a property at a negative index when offset goes beyond array start', () => {
      const arr = [1, 2, 3];
      const result = array.setLastMut(arr, 99, -5);
      // array.length - 1 + (-5) = -3, sets arr[-3] which is a property, not a standard index
      expect(result).toBe(arr);
    });

    // 8. Zero offset explicitly provided
    it('works correctly when offset 0 is explicitly provided', () => {
      expect(array.setLastMut([1, 2, 3], 7, 0)).toEqual([1, 2, 7]);
    });
  });
});
