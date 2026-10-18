import * as array from '@razomy/array';

describe('array', () => {
  describe('find', () => {
    // 1. Standard cases
    it('returns the first item that satisfies the predicate', () => {
      expect(array.find([1, 2, 3], (n) => n === 2)).toBe(2);
    });

    it('returns the first matching item when multiple items match', () => {
      expect(array.find([1, 2, 3, 2], (n) => n === 2)).toBe(2);
    });

    it('returns the item when it is the first element', () => {
      expect(array.find([5, 10, 15], (n) => n === 5)).toBe(5);
    });

    it('returns the item when it is the last element', () => {
      expect(array.find([5, 10, 15], (n) => n === 15)).toBe(15);
    });

    // 2. Error case
    it('throws an error if no item matches the predicate', () => {
      expect(() => array.find([1, 2, 3], (n) => n === 4)).toThrow();
    });

    it('throws an error for an empty array', () => {
      expect(() => array.find([], () => true)).toThrow();
    });

    // 3. Complex data types
    it('works correctly with arrays of objects', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(array.find(items, (o) => o.id === 1)).toEqual({ id: 1 });
    });

    it('returns the exact reference of the found object', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const items = [obj1, obj2];
      expect(array.find(items, (o) => o.id === 2)).toBe(obj2);
    });

    // 4. Callback arguments
    it('passes the correct arguments to the predicate (item, index, array)', () => {
      const arr = ['a', 'b', 'c'];
      const args: Array<[string, number, string[]]> = [];

      array.find(arr, (item, index, arr) => {
        args.push([item, index, arr]);
        return item === 'c';
      });

      expect(args).toEqual([
        ['a', 0, arr],
        ['b', 1, arr],
        ['c', 2, arr],
      ]);
    });

    // 5. Short-circuiting (via findIndex)
    it('stops iterating as soon as the predicate returns true', () => {
      let callCount = 0;
      array.find([1, 2, 3, 4, 5], (n) => {
        callCount++;
        return n === 3;
      });

      expect(callCount).toBe(3);
    });

    // 6. Various types
    it('works with string arrays', () => {
      expect(array.find(['foo', 'bar', 'baz'], (s) => s.startsWith('ba'))).toBe('bar');
    });

    it('works with boolean predicate on primitives', () => {
      expect(array.find([0, null, undefined, '', false, 42], (item) => typeof item === 'number' && item > 0)).toBe(42);
    });

    // 7. Single element array
    it('returns the only element if it matches', () => {
      expect(array.find([99], (n) => n === 99)).toBe(99);
    });
  });
});
