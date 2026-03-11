import {groupBy} from './group_by';

describe('array', () => {
  describe('groupBy', () => {
    // 1. Standard cases
    it('groups elements by the result of Math.floor', () => {
      expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
        '4': [4.2],
        '6': [6.1, 6.3],
      });
    });

    it('groups strings by their length', () => {
      expect(groupBy(['one', 'two', 'three'], (s) => s.length)).toEqual({
        '3': ['one', 'two'],
        '5': ['three'],
      });
    });

    it('groups objects by a property value', () => {
      const items = [
        {k: 'a', v: 1},
        {k: 'b', v: 2},
      ];
      expect(groupBy(items, (o) => o.k)).toEqual({
        a: [{k: 'a', v: 1}],
        b: [{k: 'b', v: 2}],
      });
    });

    // 2. Empty array
    it('returns an empty object for an empty array', () => {
      expect(groupBy([], (x) => x)).toEqual({});
    });

    // 3. Single element
    it('returns a single group for a single-element array', () => {
      expect(groupBy([42], (n) => n % 2 === 0 ? 'even' : 'odd')).toEqual({
        even: [42],
      });
    });

    // 4. All elements in the same group
    it('groups all elements under one key when iteratee returns the same value', () => {
      expect(groupBy([1, 2, 3, 4], () => 'all')).toEqual({
        all: [1, 2, 3, 4],
      });
    });

    // 5. All elements in different groups
    it('creates a separate group for each element when all keys are unique', () => {
      expect(groupBy([1, 2, 3], (n) => n)).toEqual({
        '1': [1],
        '2': [2],
        '3': [3],
      });
    });

    // 6. Numeric keys
    it('groups by numeric keys correctly', () => {
      expect(groupBy([10, 20, 11, 21], (n) => Math.floor(n / 10))).toEqual({
        '1': [10, 11],
        '2': [20, 21],
      });
    });

    // 7. Boolean-like grouping
    it('groups elements by a boolean-derived key', () => {
      const result = groupBy([1, 2, 3, 4, 5, 6], (n) => (n % 2 === 0 ? 'even' : 'odd'));
      expect(result).toEqual({
        odd: [1, 3, 5],
        even: [2, 4, 6],
      });
    });

    // 8. Preserves order within groups
    it('preserves the original order of elements within each group', () => {
      const result = groupBy([3, 1, 4, 1, 5, 9, 2, 6], (n) => (n <= 4 ? 'low' : 'high'));
      expect(result).toEqual({
        low: [3, 1, 4, 1, 2],
        high: [5, 9, 6],
      });
    });
  });
});
