import * as array_ from "@razomy/array";

describe('array', () => {
  describe('filter', () => {
    // 1. Standard cases
    it('returns elements that satisfy the predicate', () => {
      expect(array_.filter([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([2, 4]);
    });

    it('returns an empty array if no elements satisfy the predicate', () => {
      expect(array_.filter([1, 3, 5], (n) => n % 2 === 0)).toEqual([]);
    });

    it('returns all elements if every element satisfies the predicate', () => {
      expect(array_.filter([2, 4, 6], (n) => n % 2 === 0)).toEqual([2, 4, 6]);
    });

    // 2. Empty arrays
    it('returns an empty array when given an empty array', () => {
      expect(array_.filter([], (n) => n > 5)).toEqual([]);
      expect(array_.filter([], () => true)).toEqual([]);
    });

    // 3. Callback arguments
    it('passes the correct arguments to the predicate (item, index, array)', () => {
      const array = ['a', 'b', 'c'];
      const args: Array<[string, number, string[]]> = [];

      array_.filter(array, (item, index, arr) => {
        args.push([item, index, arr]);
        return true;
      });

      expect(args).toEqual([
        ['a', 0, array],
        ['b', 1, array],
        ['c', 2, array],
      ]);
    });

    // 4. Filtering by index
    it('filters elements based on index', () => {
      expect(array_.filter(['a', 'b', 'c'], (_, index) => index !== 1)).toEqual(['a', 'c']);
    });

    // 5. Complex data types
    it('works correctly with arrays of objects', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(array_.filter(items, (item) => item.id === 1)).toEqual([{ id: 1 }]);
    });

    it('works correctly with arrays of objects filtering multiple results', () => {
      const users = [
        { name: 'Alice', active: true },
        { name: 'Bob', active: false },
        { name: 'Charlie', active: true },
      ];
      expect(array_.filter(users, (u) => u.active)).toEqual([
        { name: 'Alice', active: true },
        { name: 'Charlie', active: true },
      ]);
    });

    // 6. Does not mutate the original array
    it('does not mutate the original array', () => {
      const array = [1, 2, 3, 4, 5];
      const original = [...array];
      array_.filter(array, (n) => n > 3);
      expect(array).toEqual(original);
    });

    // 7. Returns a new array reference
    it('returns a new array, not the same reference', () => {
      const array = [1, 2, 3];
      const result = array_.filter(array, () => true);
      expect(result).toEqual(array);
      expect(result).not.toBe(array);
    });

    // 8. Single element arrays
    it('returns the element in a single-element array if it passes the predicate', () => {
      expect(array_.filter([42], (n) => n === 42)).toEqual([42]);
    });

    it('returns an empty array for a single-element array if it fails the predicate', () => {
      expect(array_.filter([42], (n) => n !== 42)).toEqual([]);
    });

    // 9. Mixed types / falsy values
    it('handles arrays with falsy values correctly', () => {
      expect(array_.filter([0, 1, false, 2, '', 3, null, undefined], (item) => !!item)).toEqual([1, 2, 3]);
    });
  });
});
