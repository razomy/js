import { findIndex } from './find_index';

describe('array', () => {
  describe('findIndex', () => {
    // 1. Standard cases
    it('returns the index of the first element that satisfies the predicate', () => {
      expect(findIndex([1, 2, 3], (x) => x === 2)).toBe(1);
    });

    it('returns the index of the first matching element when multiple match', () => {
      expect(findIndex([1, 2, 3, 2], (x) => x === 2)).toBe(1);
    });

    it('returns the first index when the first element matches', () => {
      expect(findIndex(['a', 'b', 'c'], (x) => x !== 'b')).toBe(0);
    });

    it('returns the last index when only the last element matches', () => {
      expect(findIndex([1, 2, 3], (x) => x === 3)).toBe(2);
    });

    // 2. Throwing behavior
    it('throws an error if no element satisfies the predicate', () => {
      expect(() => findIndex([1, 2, 3], (x) => x > 5)).toThrow('Item not found.');
    });

    it('throws an error for an empty array', () => {
      expect(() => findIndex([], () => true)).toThrow('Item not found.');
    });

    // 3. Callback arguments
    it('passes the correct arguments to the predicate (item, index, array)', () => {
      const array = ['a', 'b', 'c'];
      const args: Array<[string, number, string[]]> = [];

      expect(() =>
        findIndex(array, (item, index, arr) => {
          args.push([item, index, arr]);
          return false;
        }),
      ).toThrow();

      expect(args).toEqual([
        ['a', 0, array],
        ['b', 1, array],
        ['c', 2, array],
      ]);
    });

    // 4. Short-circuiting behavior
    it('stops iterating as soon as the predicate returns true', () => {
      let callCount = 0;
      const result = findIndex([1, 2, 3, 4, 5], (n) => {
        callCount++;
        return n === 3;
      });

      expect(result).toBe(2);
      expect(callCount).toBe(3);
    });

    // 5. Complex data types
    it('works correctly with arrays of objects', () => {
      const users = [
        { name: 'Alice', active: false },
        { name: 'Bob', active: true },
        { name: 'Charlie', active: true },
      ];
      expect(findIndex(users, (u) => u.active)).toBe(1);
    });

    // 6. Single element array
    it('returns 0 for a single-element array where the element matches', () => {
      expect(findIndex([42], (x) => x === 42)).toBe(0);
    });

    it('throws for a single-element array where the element does not match', () => {
      expect(() => findIndex([42], (x) => x === 99)).toThrow('Item not found.');
    });
  });
});
