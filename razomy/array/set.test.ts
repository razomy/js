import { set } from './set';

describe('array', () => {
  describe('set', () => {
    // 1. Standard cases
    it('replaces the element at the specified index', () => {
      expect(set(['a', 'b', 'c'], 1, 'x')).toEqual(['a', 'x', 'c']);
    });

    it('replaces the first element', () => {
      expect(set([1, 2, 3], 0, 99)).toEqual([99, 2, 3]);
    });

    it('replaces the last element', () => {
      expect(set([1, 2, 3], 2, 99)).toEqual([1, 2, 99]);
    });

    it('replaces an element with the same value', () => {
      expect(set([0, 1, 0], 1, 0)).toEqual([0, 0, 0]);
    });

    // 2. Negative indices
    it('supports negative index to count from the end', () => {
      expect(set([1, 2, 3], -1, 99)).toEqual([1, 2, 99]);
    });

    it('supports negative index -2', () => {
      expect(set([1, 2, 3], -2, 99)).toEqual([1, 99, 3]);
    });

    it('supports negative index equal to -array.length (first element)', () => {
      expect(set([1, 2, 3], -3, 99)).toEqual([99, 2, 3]);
    });

    // 3. Out of bounds
    it('throws RangeError when index is >= array.length', () => {
      expect(() => set([1, 2, 3], 3, 99)).toThrow(RangeError);
    });

    it('throws RangeError when index is < -array.length', () => {
      expect(() => set([1, 2, 3], -4, 99)).toThrow(RangeError);
    });

    it('throws RangeError for an empty array with index 0', () => {
      expect(() => set([], 0, 99)).toThrow(RangeError);
    });

    // 4. Immutability
    it('returns a new array and does not mutate the original', () => {
      const original = [1, 2, 3];
      const result = set(original, 1, 99);

      expect(result).toEqual([1, 99, 3]);
      expect(original).toEqual([1, 2, 3]);
      expect(result).not.toBe(original);
    });

    // 5. Single element array
    it('works with a single element array', () => {
      expect(set([42], 0, 100)).toEqual([100]);
    });

    it('works with a single element array and negative index', () => {
      expect(set([42], -1, 100)).toEqual([100]);
    });

    // 6. Complex data types
    it('works with arrays of objects', () => {
      const obj1 = { name: 'Alice' };
      const obj2 = { name: 'Bob' };
      const obj3 = { name: 'Charlie' };
      const newObj = { name: 'Dave' };

      expect(set([obj1, obj2, obj3], 1, newObj)).toEqual([obj1, newObj, obj3]);
    });

    // 7. Floating point / non-integer index (converted to integer)
    it('handles floating point index by truncating to integer', () => {
      // Array.prototype.with converts index to integer
      expect(set([1, 2, 3], 1.7, 99)).toEqual([1, 99, 3]);
    });
  });
});
