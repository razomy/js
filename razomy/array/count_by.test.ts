import * as array from '@razomy/array';

describe('array', () => {
  describe('countBy', () => {
    // 1. Standard cases
    it('counts occurrences grouped by Math.floor', () => {
      expect(array.countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ '4': 1, '6': 2 });
    });

    it('counts occurrences grouped by string length', () => {
      expect(array.countBy(['one', 'two', 'three'], (v) => v.length)).toEqual({ '3': 2, '5': 1 });
    });

    it('counts occurrences grouped by boolean value', () => {
      expect(array.countBy([true, false, true, true], (v) => v)).toEqual({ true: 3, false: 1 });
    });

    // 2. Empty array
    it('returns an empty object for an empty array', () => {
      expect(array.countBy([], Math.floor)).toEqual({});
    });

    // 3. Single element
    it('returns a count of 1 for a single-element array', () => {
      expect(array.countBy([42], Math.floor)).toEqual({ '42': 1 });
    });

    // 4. All elements in the same group
    it('counts all elements under one key when they all map to the same group', () => {
      expect(array.countBy([2, 4, 6, 8], (n) => n % 2)).toEqual({ '0': 4 });
    });

    // 5. All elements in unique groups
    it('counts each element as 1 when all keys are unique', () => {
      expect(array.countBy([1, 2, 3], (n) => n)).toEqual({ '1': 1, '2': 1, '3': 1 });
    });

    // 6. Default predicate (identity)
    it('uses identity as the default predicate when none is provided', () => {
      expect(array.countBy(['a', 'b', 'a', 'c', 'b', 'a'])).toEqual({ a: 3, b: 2, c: 1 });
    });

    // 7. Complex data types (objects)
    it('works with arrays of objects', () => {
      const users = [
        { name: 'Alice', role: 'admin' },
        { name: 'Bob', role: 'user' },
        { name: 'Charlie', role: 'admin' },
        { name: 'Dave', role: 'user' },
        { name: 'Eve', role: 'user' },
      ];
      expect(array.countBy(users, (u) => u.role)).toEqual({ admin: 2, user: 3 });
    });

    // 8. Keys are coerced to strings
    it('coerces keys to strings', () => {
      expect(array.countBy([null, undefined, null], (v) => v)).toEqual({ null: 2, undefined: 1 });
    });

    // 9. Predicate returning mixed types that stringify the same
    it('groups values whose predicate results stringify to the same key', () => {
      expect(array.countBy([0, false, '', null], (v) => (v ? 'truthy' : 'falsy'))).toEqual({ falsy: 4 });
    });

    // 10. Numeric keys
    it('handles numeric predicate results as string keys', () => {
      const result = array.countBy([1, 2, 3, 4, 5, 6], (n) => n % 3);
      expect(result).toEqual({ '0': 2, '1': 2, '2': 2 });
    });
  });
});
