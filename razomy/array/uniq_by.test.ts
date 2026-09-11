import * as array from '@razomy/array';

describe('array', () => {
  describe('uniqBy', () => {
    // 1. Standard cases
    it('removes duplicates based on an object property', () => {
      const input = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 1, name: 'Johnny' },
      ];
      expect(array.uniqBy(input, (x) => x.id)).toEqual([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ]);
    });

    it('removes duplicates using a mathematical transformation', () => {
      expect(array.uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
    });

    it('removes duplicates based on string transformations', () => {
      expect(array.uniqBy(['a', 'A', 'b', 'B'], (x) => x.toLowerCase())).toEqual([
        'a',
        'b',
      ]);
    });

    // 2. Empty array
    it('returns an empty array for an empty input', () => {
      expect(array.uniqBy([], (x) => x)).toEqual([]);
    });

    // 3. No duplicates
    it('returns all elements when the iteratee produces unique keys', () => {
      const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(array.uniqBy(input, (x) => x.id)).toEqual(input);
    });

    // 4. All duplicates
    it('returns only the first element when all keys are the same', () => {
      const input = [
        { id: 1, val: 'first' },
        { id: 1, val: 'second' },
        { id: 1, val: 'third' },
      ];
      expect(array.uniqBy(input, (x) => x.id)).toEqual([{ id: 1, val: 'first' }]);
    });

    // 5. Preserves order of first occurrence
    it('preserves the order of first occurrence', () => {
      const input = [
        { key: 'b', order: 1 },
        { key: 'a', order: 2 },
        { key: 'b', order: 3 },
        { key: 'c', order: 4 },
        { key: 'a', order: 5 },
      ];
      expect(array.uniqBy(input, (x) => x.key)).toEqual([
        { key: 'b', order: 1 },
        { key: 'a', order: 2 },
        { key: 'c', order: 4 },
      ]);
    });

    // 6. Single element
    it('returns the same array for a single element', () => {
      const input = [{ id: 42 }];
      expect(array.uniqBy(input, (x) => x.id)).toEqual([{ id: 42 }]);
    });

    // 7. Special values as keys
    it('handles NaN keys correctly (Set treats all NaNs as equal)', () => {
      const input = [
        { val: NaN, id: 1 },
        { val: NaN, id: 2 },
        { val: 10, id: 3 },
      ];
      expect(array.uniqBy(input, (x) => x.val)).toEqual([
        { val: NaN, id: 1 },
        { val: 10, id: 3 },
      ]);
    });

    it('handles undefined and null keys correctly', () => {
      const input = [
        { id: undefined, val: 1 },
        { id: null, val: 2 },
        { id: undefined, val: 3 },
        { id: null, val: 4 },
      ];
      expect(array.uniqBy(input, (x) => x.id)).toEqual([
        { id: undefined, val: 1 },
        { id: null, val: 2 },
      ]);
    });

    // 8. Returns a new array and does not mutate the original
    it('returns a new array instance without mutating the original', () => {
      const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = array.uniqBy(input, (x) => x.id);

      expect(result).not.toBe(input);
      expect(result).toEqual(input);
    });

    // 9. Large array with many duplicates
    it('handles large arrays efficiently', () => {
      const input = Array.from({ length: 10000 }, (_, i) => ({
        id: i % 100,
        value: i,
      }));
      const result = array.uniqBy(input, (x) => x.id);

      expect(result).toHaveLength(100);
      expect(result.map((x) => x.id)).toEqual(
        Array.from({ length: 100 }, (_, i) => i)
      );
    });
  });
});
