import { flat } from './flat';

describe('array', () => {
  describe('flat', () => {
    // 1. Standard cases
    it('flattens an array of nested arrays by one level', () => {
      expect(flat([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
    });

    it('flattens mixed elements and nested arrays by one level', () => {
      expect(flat([1, 2, [3, [4]]])).toEqual([1, 2, 3, [4]]);
    });

    it('flattens arrays with string elements', () => {
      expect(flat([['a'], 'b'])).toEqual(['a', 'b']);
    });

    // 2. Empty arrays
    it('returns an empty array when given an empty array', () => {
      expect(flat([])).toEqual([]);
    });

    it('returns an empty array when given an array of empty arrays', () => {
      expect(flat([[], [], []])).toEqual([]);
    });

    // 3. No nested arrays
    it('returns a shallow copy when there are no nested arrays', () => {
      expect(flat([1, 2, 3])).toEqual([1, 2, 3]);
    });

    // 4. Only one level of flattening
    it('only flattens one level deep', () => {
      expect(flat([[[1, 2]], [[3, 4]]])).toEqual([[1, 2], [3, 4]]);
    });

    it('does not flatten deeply nested arrays', () => {
      expect(flat([[[['deep']]]])).toEqual([[['deep']]]);
    });

    // 5. Mixed types
    it('handles mixed nested and non-nested elements', () => {
      expect(flat([1, [2, 3], 4, [5]])).toEqual([1, 2, 3, 4, 5]);
    });

    // 6. Single element arrays
    it('flattens a single nested array', () => {
      expect(flat([[1]])).toEqual([1]);
    });

    it('handles a single non-nested element', () => {
      expect(flat([1])).toEqual([1]);
    });

    // 7. Complex data types
    it('works correctly with arrays of objects', () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      const obj3 = { c: 3 };
      expect(flat<any>([[obj1, obj2], [obj3]])).toEqual([obj1, obj2, obj3]);
    });

    it('preserves reference equality for objects', () => {
      const obj = { key: 'value' };
      const result = flat([[obj]]);
      expect(result[0]).toBe(obj);
    });

    // 8. Does not mutate the original array
    it('does not mutate the original array', () => {
      const original = [[1, 2], [3, 4]];
      const copy = [[1, 2], [3, 4]];
      flat(original);
      expect(original).toEqual(copy);
    });

    // 9. Mixed empty and non-empty nested arrays
    it('handles a mix of empty and non-empty nested arrays', () => {
      expect(flat([[], [1], [], [2, 3], []])).toEqual([1, 2, 3]);
    });

    // 10. Large arrays
    it('handles larger arrays', () => {
      const input = Array.from({ length: 100 }, (_, i) => [i]);
      const expected = Array.from({ length: 100 }, (_, i) => i);
      expect(flat(input)).toEqual(expected);
    });
  });
});