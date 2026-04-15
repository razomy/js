import * as array from "@razomy/array";

describe('array', () => {
  describe('tryGetLast', () => {
    // 1. Standard cases
    it('returns the last element of an array', () => {
      expect(array.tryGetLast(['a', 'b', 'c'])).toBe('c');
    });

    it('returns the second-to-last element when deltaIndex is -1', () => {
      expect(array.tryGetLast(['a', 'b', 'c'], -1)).toBe('b');
    });

    it('returns the first element when deltaIndex offsets to the start', () => {
      expect(array.tryGetLast(['a', 'b', 'c'], -2)).toBe('a');
    });

    // 2. Empty array
    it('returns null for an empty array', () => {
      expect(array.tryGetLast([])).toBeNull();
    });

    it('returns null for an empty array with a deltaIndex', () => {
      expect(array.tryGetLast([], -1)).toBeNull();
    });

    // 3. Single element array
    it('returns the only element for a single-element array', () => {
      expect(array.tryGetLast([42])).toBe(42);
    });

    it('returns null for a single-element array with deltaIndex -1', () => {
      expect(array.tryGetLast([42], -1)).toBeNull();
    });

    // 4. Out of bounds
    it('returns null when deltaIndex goes out of bounds (too far back)', () => {
      expect(array.tryGetLast(['a', 'b', 'c'], -3)).toBeNull();
    });

    it('returns null when deltaIndex goes out of bounds (positive offset beyond end)', () => {
      expect(array.tryGetLast(['a', 'b', 'c'], 4)).toBeNull();
    });

    // 5. Default deltaIndex
    it('defaults deltaIndex to 0 when not provided', () => {
      expect(array.tryGetLast([1, 2, 3])).toBe(3);
    });

    // 6. deltaIndex of 0
    it('returns the last element when deltaIndex is explicitly 0', () => {
      expect(array.tryGetLast(['x', 'y', 'z'], 0)).toBe('z');
    });

    // 7. Works with different types
    it('works with arrays of numbers', () => {
      expect(array.tryGetLast([10, 20, 30])).toBe(30);
      expect(array.tryGetLast([10, 20, 30], -1)).toBe(20);
    });

    it('works with arrays of objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };
      expect(array.tryGetLast([obj1, obj2, obj3])).toBe(obj3);
      expect(array.tryGetLast([obj1, obj2, obj3], -2)).toBe(obj1);
    });

    // 8. Handling undefined values in array
    it('returns null when the element at the computed index is undefined', () => {
      expect(array.tryGetLast([1, undefined, 3], -1)).toBeNull();
    });

    // 9. Large negative deltaIndex
    it('returns null for a very large negative deltaIndex', () => {
      expect(array.tryGetLast(['a', 'b', 'c'], -100)).toBeNull();
    });

    // 10. Large positive deltaIndex
    it('returns null for a very large positive deltaIndex', () => {
      expect(array.tryGetLast(['a', 'b', 'c'], 100)).toBeNull();
    });
  });
});
