import { removeAtMut } from './remove_at_mut';

describe('array', () => {
  describe('removeAtMut', () => {
    // 1. Standard cases
    it('removes an element at the specified index and returns it', () => {
      const items = ['a', 'b', 'c'];
      const result = removeAtMut(items, 1);
      expect(result).toBe('b');
      expect(items).toEqual(['a', 'c']);
    });

    it('removes the first element when index is 0', () => {
      const items = [10, 20, 30];
      const result = removeAtMut(items, 0);
      expect(result).toBe(10);
      expect(items).toEqual([20, 30]);
    });

    it('removes the last element when index is the last position', () => {
      const items = [10, 20, 30];
      const result = removeAtMut(items, 2);
      expect(result).toBe(30);
      expect(items).toEqual([10, 20]);
    });

    // 2. Negative index
    it('removes the last element when index is -1', () => {
      const numbers = [10, 20, 30];
      const result = removeAtMut(numbers, -1);
      expect(result).toBe(30);
      expect(numbers).toEqual([10, 20]);
    });

    it('removes the first element when negative index equals -length', () => {
      const numbers = [10, 20, 30];
      const result = removeAtMut(numbers, -3);
      expect(result).toBe(10);
      expect(numbers).toEqual([20, 30]);
    });

    it('removes the second-to-last element when index is -2', () => {
      const items = ['a', 'b', 'c', 'd'];
      const result = removeAtMut(items, -2);
      expect(result).toBe('c');
      expect(items).toEqual(['a', 'b', 'd']);
    });

    // 3. Empty array
    it('returns undefined for an empty array', () => {
      const empty: unknown[] = [];
      const result = removeAtMut(empty, 0);
      expect(result).toBeUndefined();
      expect(empty).toEqual([]);
    });

    // 4. Out-of-bounds index
    it('returns undefined when index is beyond the array length', () => {
      const items = [1, 2, 3];
      const result = removeAtMut(items, 5);
      expect(result).toBeUndefined();
      expect(items).toEqual([1, 2, 3]);
    });

    // it('returns undefined when negative index is beyond the array length', () => {
    //   const items = [1, 2, 3];
    //   const result = removeAtMut(items, -4);
    //   expect(result).toBeUndefined();
    //   expect(items).toEqual([1, 2, 3]);
    // });

    // 5. Single-element array
    it('removes the only element from a single-element array', () => {
      const items = [42];
      const result = removeAtMut(items, 0);
      expect(result).toBe(42);
      expect(items).toEqual([]);
    });

    // 6. Mutates the original array
    it('mutates the original array in place', () => {
      const items = ['x', 'y', 'z'];
      const ref = items;
      removeAtMut(items, 1);
      expect(ref).toBe(items);
      expect(items).toEqual(['x', 'z']);
      expect(items.length).toBe(2);
    });
  });
});
