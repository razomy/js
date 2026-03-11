import { reverseMut } from './reverse_mut';

describe('array', () => {
  describe('reverseMut', () => {
    // 1. Standard cases
    it('reverses an array of numbers in place', () => {
      const array = [1, 2, 3];
      reverseMut(array);
      expect(array).toEqual([3, 2, 1]);
    });

    it('reverses an array of strings in place', () => {
      const array = ['a', 'b'];
      reverseMut(array);
      expect(array).toEqual(['b', 'a']);
    });

    it('reverses an array with multiple elements', () => {
      const array = [1, 2, 3, 4, 5];
      reverseMut(array);
      expect(array).toEqual([5, 4, 3, 2, 1]);
    });

    // 2. Return value
    it('returns the same array reference', () => {
      const array = [1, 2, 3];
      const result = reverseMut(array);
      expect(result).toBe(array);
    });

    it('returns the reversed array', () => {
      const result = reverseMut([10, 20, 30]);
      expect(result).toEqual([30, 20, 10]);
    });

    // 3. Empty array
    it('handles an empty array', () => {
      const array: number[] = [];
      reverseMut(array);
      expect(array).toEqual([]);
    });

    // 4. Single element
    it('handles a single-element array', () => {
      const array = [42];
      reverseMut(array);
      expect(array).toEqual([42]);
    });

    // 5. Even and odd length arrays
    it('reverses an even-length array correctly', () => {
      const array = [1, 2, 3, 4];
      reverseMut(array);
      expect(array).toEqual([4, 3, 2, 1]);
    });

    it('reverses an odd-length array correctly', () => {
      const array = [1, 2, 3];
      reverseMut(array);
      expect(array).toEqual([3, 2, 1]);
    });

    // 6. Mutates the original array
    it('mutates the original array rather than creating a new one', () => {
      const array = [1, 2, 3];
      const original = array;
      reverseMut(array);
      expect(original).toEqual([3, 2, 1]);
      expect(array).toBe(original);
    });

    // 7. Complex data types
    it('works correctly with arrays of objects', () => {
      const a = { id: 1 };
      const b = { id: 2 };
      const c = { id: 3 };
      const array = [a, b, c];
      reverseMut(array);
      expect(array).toEqual([c, b, a]);
      expect(array[0]).toBe(c);
      expect(array[2]).toBe(a);
    });

    // 8. Double reverse restores original order
    it('double reverse restores the original order', () => {
      const array = [1, 2, 3, 4, 5];
      reverseMut(array);
      reverseMut(array);
      expect(array).toEqual([1, 2, 3, 4, 5]);
    });

    // 9. Mixed types
    it('works with mixed types', () => {
      const array = [1, 'two', 3, 'four'] as (string | number)[];
      reverseMut(array);
      expect(array).toEqual(['four', 3, 'two', 1]);
    });
  });
});