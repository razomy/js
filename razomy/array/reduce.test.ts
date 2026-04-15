import * as array from '@razomy/array';

describe('array', () => {
  describe('reduce', () => {
    // 1. Standard cases
    it('sums all elements in the array', () => {
      expect(array.reduce([1, 2, 3, 4], (acc, val) => acc + val, 0)).toBe(10);
    });

    it('converts an array of tuples into an object', () => {
      const result = array.reduce(
        [
          ['a', 1],
          ['b', 2],
        ] as [string, number][],
        (acc, [key, val]) => ({ ...acc, [key]: val }),
        {} as Record<string, number>,
      );
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('maps values by pushing into an accumulator array', () => {
      const result = array.reduce(
        [1, 2, 3],
        (acc, val) => {
          acc.push(val * 2);
          return acc;
        },
        [] as number[],
      );
      expect(result).toEqual([2, 4, 6]);
    });

    // 2. Empty array
    it('returns the initial value for an empty array', () => {
      expect(array.reduce([], (acc, val) => acc + val, 0)).toBe(0);
    });

    it('returns the initial value (object) for an empty array', () => {
      const initial = { count: 0 };
      expect(array.reduce([], (acc) => acc, initial)).toBe(initial);
    });

    // 3. Single element
    it('applies the reducer once for a single-element array', () => {
      expect(array.reduce([5], (acc, val) => acc + val, 10)).toBe(15);
    });

    // 4. Callback arguments
    it('passes the correct arguments to the reducer (accumulator, value, index, array)', () => {
      const arr = ['a', 'b', 'c'];
      const args: Array<[string, string, number, string[]]> = [];

      array.reduce(
        arr,
        (acc, value, index, arr) => {
          args.push([acc, value, index, arr]);
          return acc + value;
        },
        '',
      );

      expect(args).toEqual([
        ['', 'a', 0, arr],
        ['a', 'b', 1, arr],
        ['ab', 'c', 2, arr],
      ]);
    });

    // 5. Accumulator mutation
    it('supports accumulator mutation without spread', () => {
      const result = array.reduce(
        ['x', 'y', 'z'],
        (acc, val, index) => {
          acc[val] = index;
          return acc;
        },
        {} as Record<string, number>,
      );
      expect(result).toEqual({ x: 0, y: 1, z: 2 });
    });

    // 6. String concatenation
    it('concatenates strings correctly', () => {
      expect(array.reduce(['hello', ' ', 'world'], (acc, val) => acc + val, '')).toBe('hello world');
    });

    // 7. Boolean reduction
    it('reduces to a boolean (logical AND)', () => {
      expect(array.reduce([true, true, true], (acc, val) => acc && val, true)).toBe(true);
      expect(array.reduce([true, false, true], (acc, val) => acc && val, true)).toBe(false);
    });

    // 8. Counting occurrences
    it('counts occurrences of elements', () => {
      const result = array.reduce(
        ['a', 'b', 'a', 'c', 'b', 'a'],
        (acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );
      expect(result).toEqual({ a: 3, b: 2, c: 1 });
    });
  });
});
