import * as array from '@razomy/array';

describe('array', () => {
  describe('sortBy', () => {
    // 1. Standard cases - numeric sorting
    it('sorts numbers in ascending order', () => {
      expect(array.sortBy([3, 1, 2], (n) => n)).toEqual([1, 2, 3]);
    });

    it('sorts strings by length', () => {
      expect(array.sortBy(['bb', 'ccc', 'a'], (s) => s.length)).toEqual(['a', 'bb', 'ccc']);
    });

    it('sorts objects by a numeric property', () => {
      const result = array.sortBy(
        [
          { user: 'fred', age: 40 },
          { user: 'barney', age: 36 },
        ],
        (u) => u.age,
      );
      expect(result).toEqual([
        { user: 'barney', age: 36 },
        { user: 'fred', age: 40 },
      ]);
    });

    // 2. Empty array
    it('returns an empty array when given an empty array', () => {
      expect(array.sortBy([], (n) => n)).toEqual([]);
    });

    // 3. Single element
    it('returns a single-element array unchanged', () => {
      expect(array.sortBy([42], (n) => n)).toEqual([42]);
    });

    // 4. Does not mutate the original array
    it('does not mutate the original array', () => {
      const original = [3, 1, 2];
      const originalCopy = [...original];
      array.sortBy(original, (n) => n);
      expect(original).toEqual(originalCopy);
    });

    // 5. Returns a new array reference
    it('returns a new array, not the same reference', () => {
      const original = [1, 2, 3];
      const result = array.sortBy(original, (n) => n);
      expect(result).not.toBe(original);
    });

    // 6. Stable sort - preserves order of equal elements
    it('preserves the relative order of elements with equal sort criteria (stable sort)', () => {
      const items = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 30 },
        { name: 'Dave', age: 25 },
      ];
      const result = array.sortBy(items, (item) => item.age);
      expect(result).toEqual([
        { name: 'Bob', age: 25 },
        { name: 'Dave', age: 25 },
        { name: 'Alice', age: 30 },
        { name: 'Charlie', age: 30 },
      ]);
    });

    // 7. Sorting by string criteria
    it('sorts by string criteria in ascending order', () => {
      const items = [
        { name: 'Charlie', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 },
      ];
      const result = array.sortBy(items, (item) => item.name);
      expect(result).toEqual([
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 },
        { name: 'Charlie', age: 30 },
      ]);
    });

    // 8. Already sorted array
    it('returns a correctly sorted array when input is already sorted', () => {
      expect(array.sortBy([1, 2, 3, 4, 5], (n) => n)).toEqual([1, 2, 3, 4, 5]);
    });

    // 9. Reverse sorted array
    it('sorts a reverse-sorted array correctly', () => {
      expect(array.sortBy([5, 4, 3, 2, 1], (n) => n)).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
