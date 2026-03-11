import { getFirst } from './get_first';

describe('array', () => {
  describe('getFirst', () => {
    // 1. Standard cases
    it('returns the first element of a numeric array', () => {
      expect(getFirst([1, 2, 3])).toBe(1);
    });

    it('returns the first element of a string array', () => {
      expect(getFirst(['a', 'b', 'c'])).toBe('a');
    });

    // 2. Single element array
    it('returns the only element of a single-element array', () => {
      expect(getFirst([42])).toBe(42);
    });

    // 3. Empty array
    it('throws an error when the array is empty', () => {
      expect(() => getFirst([])).toThrow('Array is empty');
    });

    // 4. Complex data types
    it('returns the first element of an array of objects', () => {
      const obj = { name: 'Alice' };
      expect(getFirst([obj, { name: 'Bob' }])).toBe(obj);
    });

    it('returns the first element of a nested array', () => {
      const nested = [1, 2];
      expect(getFirst([nested, [3, 4]])).toBe(nested);
    });

    // 5. Falsy first elements
    it('returns the first element even if it is falsy', () => {
      expect(getFirst([0, 1, 2])).toBe(0);
      expect(getFirst([false, true])).toBe(false);
      expect(getFirst([null, 'a'])).toBe(null);
      expect(getFirst([undefined, 'a'])).toBe(undefined);
      expect(getFirst(['', 'a'])).toBe('');
    });

    // 6. Does not mutate the original array
    it('does not mutate the original array', () => {
      const array = [1, 2, 3];
      getFirst(array);
      expect(array).toEqual([1, 2, 3]);
    });
  });
});