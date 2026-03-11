import { addMut } from './add_mut';

describe('array', () => {
  describe('addMut', () => {
    // 1. Standard cases
    it('adds a number to the end of a number array', () => {
      const array = [1, 2];
      addMut(array, 3);
      expect(array).toEqual([1, 2, 3]);
    });

    it('adds a string to the end of a string array', () => {
      const array = ['a'];
      addMut(array, 'b');
      expect(array).toEqual(['a', 'b']);
    });

    it('adds an object to the end of an object array', () => {
      const array = [{ id: 1 }];
      addMut(array, { id: 2 });
      expect(array).toEqual([{ id: 1 }, { id: 2 }]);
    });

    // 2. Returns the same array reference
    it('returns the same array reference (mutates in place)', () => {
      const array = [1, 2];
      const result = addMut(array, 3);
      expect(result).toBe(array);
    });

    // 3. Empty array
    it('adds an element to an empty array', () => {
      const array: number[] = [];
      addMut(array, 42);
      expect(array).toEqual([42]);
    });

    // 4. Multiple additions
    it('supports multiple sequential additions', () => {
      const array: number[] = [];
      addMut(array, 1);
      addMut(array, 2);
      addMut(array, 3);
      expect(array).toEqual([1, 2, 3]);
    });

    // 5. Adding undefined and null
    it('adds undefined as a value', () => {
      const array: (number | undefined)[] = [1];
      addMut(array, undefined);
      expect(array).toEqual([1, undefined]);
    });

    it('adds null as a value', () => {
      const array: (string | null)[] = ['a'];
      addMut(array, null);
      expect(array).toEqual(['a', null]);
    });

    // 6. Array length is updated
    it('increases the array length by one', () => {
      const array = [1, 2, 3];
      expect(array.length).toBe(3);
      addMut(array, 4);
      expect(array.length).toBe(4);
    });

    // 7. Chaining
    it('supports chaining since it returns the array', () => {
      const array = [1];
      const result = addMut(addMut(array, 2), 3);
      expect(result).toEqual([1, 2, 3]);
      expect(result).toBe(array);
    });

    // 8. Complex data types
    it('works with nested arrays as values', () => {
      const array: number[][] = [[1, 2]];
      addMut(array, [3, 4]);
      expect(array).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });
  });
});
