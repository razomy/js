import * as array_ from '@razomy/array';

describe('array', () => {
  describe('map', () => {
    // 1. Standard cases
    it('transforms each element using the iteratee', () => {
      expect(array_.map([1, 2, 3], (n) => n * 2)).toEqual([2, 4, 6]);
    });

    it('converts elements to strings', () => {
      expect(array_.map([1, 2, 3], String)).toEqual(['1', '2', '3']);
    });

    it('uses index in the iteratee', () => {
      expect(array_.map(['a', 'b'], (char, index) => char + index)).toEqual(['a0', 'b1']);
    });

    // 2. Empty arrays
    it('returns an empty array when given an empty array', () => {
      expect(array_.map([], (n) => n)).toEqual([]);
    });

    // 3. Callback arguments
    it('passes the correct arguments to the iteratee (element, index, array)', () => {
      const array = ['x', 'y', 'z'];
      const args: Array<[string, number, string[]]> = [];

      array_.map(array, (element, index, arr) => {
        args.push([element, index, arr]);
        return element;
      });

      expect(args).toEqual([
        ['x', 0, array],
        ['y', 1, array],
        ['z', 2, array],
      ]);
    });

    // 4. Returns a new array (no mutation)
    it('returns a new array and does not mutate the original', () => {
      const original = [1, 2, 3];
      const result = array_.map(original, (n) => n * 10);

      expect(result).toEqual([10, 20, 30]);
      expect(original).toEqual([1, 2, 3]);
      expect(result).not.toBe(original);
    });

    // 5. Result array has correct length
    it('returns an array of the same length as the input', () => {
      const result = array_.map([10, 20, 30, 40, 50], (n) => n + 1);
      expect(result).toHaveLength(5);
    });

    // 6. Single element array
    it('works with a single element array', () => {
      expect(array_.map([42], (n) => n * 2)).toEqual([84]);
    });

    // 7. Complex data types
    it('works correctly with arrays of objects', () => {
      const users = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ];
      expect(array_.map(users, (u) => u.name)).toEqual(['Alice', 'Bob']);
    });

    // 8. Type transformation
    it('can change the type of elements', () => {
      const result = array_.map([1, 2, 3], (n) => ({ value: n }));
      expect(result).toEqual([{ value: 1 }, { value: 2 }, { value: 3 }]);
    });

    // 9. Iterates over every element
    it('calls the iteratee for every element in the array', () => {
      let callCount = 0;
      array_.map([1, 2, 3, 4, 5], (n) => {
        callCount++;
        return n;
      });
      expect(callCount).toBe(5);
    });

    // 10. Handles undefined/null values in array
    it('handles arrays with undefined and null values', () => {
      expect(array_.map([undefined, null, 0, ''], (val) => String(val))).toEqual(['undefined', 'null', '0', '']);
    });
  });
});
