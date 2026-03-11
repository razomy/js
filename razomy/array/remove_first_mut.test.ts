import {removeFirstMut} from './remove_first_mut';

describe('array', () => {
  describe('removeFirstMut', () => {
    // 1. Standard cases
    it('removes the first occurrence of a value from the array', () => {
      const array = [1, 2, 3, 2];
      removeFirstMut(array, 2);
      expect(array).toEqual([1, 3, 2]);
    });

    it('removes a value from the beginning of the array', () => {
      const array = ['a', 'b', 'c'];
      removeFirstMut(array, 'a');
      expect(array).toEqual(['b', 'c']);
    });

    it('removes a value from the end of the array', () => {
      const array = [1, 2, 3];
      removeFirstMut(array, 3);
      expect(array).toEqual([1, 2]);
    });

    // 2. Value not found
    it('leaves the array unchanged if the value is not found', () => {
      const array = [1, 2, 3];
      removeFirstMut(array, 99);
      expect(array).toEqual([1, 2, 3]);
    });

    // 3. Empty array
    it('does nothing on an empty array', () => {
      const array: number[] = [];
      removeFirstMut(array, 1);
      expect(array).toEqual([]);
    });

    // 4. Only first occurrence is removed
    it('removes only the first occurrence when there are multiple matches', () => {
      const array = [5, 5, 5];
      removeFirstMut(array, 5);
      expect(array).toEqual([5, 5]);
    });

    // 5. Single-element array
    it('results in an empty array when removing the only element', () => {
      const array = [42];
      removeFirstMut(array, 42);
      expect(array).toEqual([]);
    });

    // 6. Strict equality
    it('uses strict equality for comparison', () => {
      const array = [1, '1', 2];
      removeFirstMut(array, 1);
      expect(array).toEqual(['1', 2]);
    });

    // 7. Reference types
    it('works with reference types using strict equality', () => {
      const obj1 = {id: 1};
      const obj2 = {id: 2};
      const obj3 = {id: 3};
      const array = [obj1, obj2, obj3];
      removeFirstMut(array, obj2);
      expect(array).toEqual([obj1, obj3]);
    });

    it('does not remove an object with the same shape but different reference', () => {
      const obj1 = {id: 1};
      const obj2 = {id: 2};
      const array = [obj1, obj2];
      removeFirstMut(array, {id: 1} as any);
      expect(array).toEqual([obj1, obj2]);
    });

    // 8. Returns void
    it('returns undefined', () => {
      const array = [1, 2, 3];
      const result = removeFirstMut(array, 2);
      expect(result).toBeUndefined();
    });

    // 9. Mutates the original array (same reference)
    it('mutates the original array in place', () => {
      const array = [1, 2, 3];
      const ref = array;
      removeFirstMut(array, 2);
      expect(ref).toBe(array);
      expect(ref).toEqual([1, 3]);
    });

    // 10. Special values
    it('handles undefined as a value', () => {
      const array = [1, undefined, 3];
      removeFirstMut(array, undefined);
      expect(array).toEqual([1, 3]);
    });
  });
});
