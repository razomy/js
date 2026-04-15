import * as array_ from "@razomy/array";

describe('array', () => {
  describe('some', () => {
    // 1. Standard cases
    it('returns true if at least one element satisfies the predicate', () => {
      expect(array_.some([1, 2, 3, 4], (n) => n % 2 === 0)).toBe(true);
    });

    it('returns false if no elements satisfy the predicate', () => {
      expect(array_.some([1, 3, 5, 7], (n) => n % 2 === 0)).toBe(false);
    });

    it('returns true if all elements satisfy the predicate', () => {
      expect(array_.some([2, 4, 6], (n) => n % 2 === 0)).toBe(true);
    });

    // 2. Empty arrays
    it('returns false for an empty array regardless of the predicate', () => {
      expect(array_.some([], (n) => n > 5)).toBe(false);
      expect(array_.some([], () => true)).toBe(false);
    });

    // 3. String arrays
    it('works correctly with arrays of strings', () => {
      expect(array_.some(['a', 'bc', 'd'], (s) => s.length > 1)).toBe(true);
    });

    it('returns false when no strings match the predicate', () => {
      expect(array_.some(['a', 'b', 'c'], (s) => s.length > 1)).toBe(false);
    });

    // 4. Callback arguments
    it('passes the correct arguments to the predicate (item, index, array)', () => {
      const array = ['a', 'b', 'c'];
      const args: Array<[string, number, string[]]> = [];

      array_.some(array, (item, index, arr) => {
        args.push([item, index, arr]);
        return false;
      });

      expect(args).toEqual([
        ['a', 0, array],
        ['b', 1, array],
        ['c', 2, array],
      ]);
    });

    // 5. Iteration behavior (Short-circuiting)
    it('stops iterating as soon as the predicate returns true', () => {
      let callCount = 0;
      const result = array_.some([1, 2, 3, 4, 5], (n) => {
        callCount++;
        return n === 3;
      });

      expect(result).toBe(true);
      expect(callCount).toBe(3); // Executes for 1, 2, and 3. Stops at 3.
    });

    // 6. Complex data types
    it('works correctly with arrays of objects', () => {
      const users = [
        { name: 'Alice', active: false },
        { name: 'Bob', active: true },
      ];
      expect(array_.some(users, (u) => u.active)).toBe(true);

      const inactiveUsers = [
        { name: 'Alice', active: false },
        { name: 'Charlie', active: false },
      ];
      expect(array_.some(inactiveUsers, (u) => u.active)).toBe(false);
    });

    // 7. Single element arrays
    it('returns true for a single-element array when the element matches', () => {
      expect(array_.some([42], (n) => n === 42)).toBe(true);
    });

    it('returns false for a single-element array when the element does not match', () => {
      expect(array_.some([42], (n) => n === 0)).toBe(false);
    });

    // 8. Predicate using index
    it('works correctly when predicate uses the index argument', () => {
      expect(array_.some([10, 20, 30], (_, index) => index === 2)).toBe(true);
      expect(array_.some([10, 20, 30], (_, index) => index === 5)).toBe(false);
    });
  });
});
