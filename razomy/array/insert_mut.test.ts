import * as array from '@razomy/array';

describe('array', () => {
  describe('insertMut', () => {
    // 1. Standard cases
    it('inserts an item at the specified index in the middle', () => {
      expect(array.insertMut([1, 3], 1, 2)).toEqual([1, 2, 3]);
    });

    it('inserts a string item at the specified index', () => {
      expect(array.insertMut(['a', 'c'], 1, 'b')).toEqual(['a', 'b', 'c']);
    });

    it('inserts an object at the end of the array', () => {
      expect(array.insertMut([{ id: 1 }], 1, { id: 2 })).toEqual([{ id: 1 }, { id: 2 }]);
    });

    // 2. Inserting at the beginning
    it('inserts an item at the beginning of the array (index 0)', () => {
      expect(array.insertMut([2, 3], 0, 1)).toEqual([1, 2, 3]);
    });

    // 3. Inserting at the end
    it('inserts an item at the end of the array', () => {
      expect(array.insertMut([1, 2], 2, 3)).toEqual([1, 2, 3]);
    });

    // 4. Empty array
    it('inserts an item into an empty array at index 0', () => {
      expect(array.insertMut([], 0, 'x')).toEqual(['x']);
    });

    // 5. Mutation
    it('mutates the original array', () => {
      const original = [1, 3];
      const result = array.insertMut(original, 1, 2);
      expect(result).toBe(original);
      expect(original).toEqual([1, 2, 3]);
    });

    // 6. Returns the same reference
    it('returns a reference to the same array that was passed in', () => {
      const arr = ['a', 'b'];
      const result = array.insertMut(arr, 1, 'c');
      expect(result).toBe(arr);
    });

    // 7. Negative index
    it('handles negative index (splice behavior)', () => {
      const arr = [1, 2, 3];
      array.insertMut(arr, -1, 99);
      expect(arr).toEqual([1, 2, 99, 3]);
    });

    // 8. Index beyond array length
    it('inserts at the end when index exceeds array length', () => {
      const arr = [1, 2];
      array.insertMut(arr, 10, 3);
      expect(arr).toEqual([1, 2, 3]);
    });

    // 9. Single-element array
    it('inserts before the only element in a single-element array', () => {
      expect(array.insertMut([2], 0, 1)).toEqual([1, 2]);
    });

    it('inserts after the only element in a single-element array', () => {
      expect(array.insertMut([1], 1, 2)).toEqual([1, 2]);
    });

    // 10. Complex data types
    it('works correctly with arrays of objects', () => {
      const obj1 = { name: 'Alice' };
      const obj2 = { name: 'Bob' };
      const obj3 = { name: 'Charlie' };
      const arr = [obj1, obj3];
      array.insertMut(arr, 1, obj2);
      expect(arr).toEqual([obj1, obj2, obj3]);
      expect(arr[1]).toBe(obj2);
    });

    // 11. Inserting undefined/null
    it('inserts undefined as a value', () => {
      const arr: (number | undefined)[] = [1, 2];
      array.insertMut(arr, 1, undefined);
      expect(arr).toEqual([1, undefined, 2]);
    });
  });
});
