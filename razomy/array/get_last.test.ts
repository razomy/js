import { getLast } from './get_last';

describe('array', () => {
  describe('getLast', () => {
    // 1. Standard cases
    it('returns the last element of an array', () => {
      expect(getLast([1, 2, 3])).toBe(3);
    });

    it('returns the second to last element with offset 1', () => {
      expect(getLast(['a', 'b', 'c'], 1)).toBe('b');
    });

    it('returns the first element when offset equals array length minus 1', () => {
      expect(getLast([1, 2, 3], 2)).toBe(1);
    });

    // 2. Single element array
    it('returns the only element of a single-element array', () => {
      expect(getLast([42])).toBe(42);
    });

    it('throws an error for a single-element array with offset 1', () => {
      expect(() => getLast([42], 1)).toThrow('Element at offset 1 does not exist.');
    });

    // 3. Empty array
    it('throws an error for an empty array', () => {
      expect(() => getLast([])).toThrow('Element at offset 0 does not exist.');
    });

    it('throws an error for an empty array with an offset', () => {
      expect(() => getLast([], 5)).toThrow('Element at offset 5 does not exist.');
    });

    // 4. Out of bounds offset
    it('throws an error when offset is larger than array length', () => {
      expect(() => getLast([1, 2, 3], 10)).toThrow('Element at offset 10 does not exist.');
    });

    it('throws an error when offset equals array length', () => {
      expect(() => getLast([1, 2, 3], 3)).toThrow('Element at offset 3 does not exist.');
    });

    // 5. Default offset
    it('uses offset 0 by default', () => {
      expect(getLast([10, 20, 30])).toBe(30);
    });

    // 6. Complex data types
    it('works correctly with arrays of objects', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(getLast(items)).toEqual({ id: 3 });
      expect(getLast(items, 1)).toEqual({ id: 2 });
    });

    it('works correctly with arrays of strings', () => {
      expect(getLast(['foo', 'bar', 'baz'])).toBe('baz');
    });

    // 7. Edge case: undefined values in array
    it('throws an error when the element at the position is undefined', () => {
      expect(() => getLast([1, undefined, 3], 1)).toThrow('Element at offset 1 does not exist.');
    });

    it('throws an error for an array of all undefined values', () => {
      expect(() => getLast([undefined, undefined])).toThrow('Element at offset 0 does not exist.');
    });

    // 8. Offset 0 explicitly
    it('returns the last element when offset is explicitly 0', () => {
      expect(getLast([5, 10, 15], 0)).toBe(15);
    });
  });
});