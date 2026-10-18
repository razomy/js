import * as array from '@razomy/array';

describe('array', () => {
  describe('toggle', () => {
    // 1. Standard cases - adding items
    it('appends the item if it does not exist in the array', () => {
      expect(array.toggle([1, 2], 3)).toEqual([1, 2, 3]);
    });

    // 2. Standard cases - removing items
    it('removes the item if it exists in the array', () => {
      expect(array.toggle(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']);
    });

    it('removes the first occurrence of the item', () => {
      expect(array.toggle([1, 2, 3, 2], 2)).toEqual([1, 3, 2]);
    });

    // 3. Empty array
    it('appends the item to an empty array', () => {
      expect(array.toggle([], true)).toEqual([true]);
    });

    it('appends a number to an empty array', () => {
      expect(array.toggle([], 42)).toEqual([42]);
    });

    // 4. Removing from edges
    it('removes the first element correctly', () => {
      expect(array.toggle([1, 2, 3], 1)).toEqual([2, 3]);
    });

    it('removes the last element correctly', () => {
      expect(array.toggle([1, 2, 3], 3)).toEqual([1, 2]);
    });

    // 5. Single element array
    it('removes the only element, resulting in an empty array', () => {
      expect(array.toggle([5], 5)).toEqual([]);
    });

    it('appends to a single element array if item is different', () => {
      expect(array.toggle([5], 10)).toEqual([5, 10]);
    });

    // 6. Immutability
    it('returns a new array and does not mutate the original', () => {
      const original = [1, 2, 3];
      const result = array.toggle(original, 2);

      expect(result).toEqual([1, 3]);
      expect(original).toEqual([1, 2, 3]);
      expect(result).not.toBe(original);
    });

    it('returns a new array when appending and does not mutate the original', () => {
      const original = [1, 2];
      const result = array.toggle(original, 3);

      expect(result).toEqual([1, 2, 3]);
      expect(original).toEqual([1, 2]);
      expect(result).not.toBe(original);
    });

    // 7. Complex data types (reference equality)
    it('works with object references', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };

      expect(array.toggle([obj1, obj2], obj3)).toEqual([obj1, obj2, obj3]);
      expect(array.toggle([obj1, obj2, obj3], obj2)).toEqual([obj1, obj3]);
    });

    it('does not match objects by value, only by reference', () => {
      const obj = { id: 1 };
      const result = array.toggle([obj], { id: 1 });

      // { id: 1 } is a different reference, so it should be appended
      expect(result).toEqual([obj, { id: 1 }]);
    });

    // 8. String items
    it('works correctly with string arrays', () => {
      expect(array.toggle(['hello', 'world'], 'hello')).toEqual(['world']);
      expect(array.toggle(['hello', 'world'], 'foo')).toEqual(['hello', 'world', 'foo']);
    });

    // 9. Boolean items
    it('works correctly with boolean arrays', () => {
      expect(array.toggle([true, false], true)).toEqual([false]);
      expect(array.toggle([false], true)).toEqual([false, true]);
    });
  });
});
