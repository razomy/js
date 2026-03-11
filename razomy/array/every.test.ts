import { every } from './every';

describe('array', () => {
  describe('every', () => {
    // 1. Standard cases
    it('returns true if all elements satisfy the predicate', () => {
      expect(every([2, 4, 6], (n) => n % 2 === 0)).toBe(true);
    });

    it('returns false if at least one element fails the predicate', () => {
      expect(every([2, 4, 7], (n) => n % 2 === 0)).toBe(false);
    });

    it('returns false if all elements fail the predicate', () => {
      expect(every([1, 3, 5], (n) => n % 2 === 0)).toBe(false);
    });

    // 2. Empty arrays
    it('returns true for an empty array regardless of the predicate', () => {
      expect(every([], (n) => n > 5)).toBe(true);
      expect(every([], () => false)).toBe(true);
    });

    // 3. Callback arguments
    it('passes the correct arguments to the predicate (item, index, array)', () => {
      const array = ['a', 'b', 'c'];
      const args: Array<[string, number, string[]]> = [];

      every(array, (item, index, arr) => {
        args.push([item, index, arr]);
        return true;
      });

      expect(args).toEqual([
        ['a', 0, array],
        ['b', 1, array],
        ['c', 2, array],
      ]);
    });

    // 4. Iteration behavior (Short-circuiting)
    it('stops iterating as soon as the predicate returns false', () => {
      let callCount = 0;
      const result = every([1, 2, 3, 4, 5], (n) => {
        callCount++;
        return n < 3;
      });

      expect(result).toBe(false);
      expect(callCount).toBe(3); // Executes for 1, 2, and 3. Stops at 3.
    });

    // 5. Complex data types
    it('works correctly with arrays of objects', () => {
      const users = [
        { name: 'Alice', active: true },
        { name: 'Bob', active: true },
      ];
      expect(every(users, (u) => u.active)).toBe(true);

      const mixedUsers = [
        { name: 'Alice', active: true },
        { name: 'Charlie', active: false },
      ];
      expect(every(mixedUsers, (u) => u.active)).toBe(false);
    });
  });
});