import { createByIndexAndSize } from './create_by_index_and_size';

describe('array', () => {
  describe('createByIndexAndSize', () => {
    // 1. Standard cases
    it('places 1 at the first index', () => {
      expect(createByIndexAndSize(0, 2)).toEqual([1, 0]);
    });

    it('places 1 at a middle index', () => {
      expect(createByIndexAndSize(1, 3)).toEqual([0, 1, 0]);
    });

    it('places 1 at the last index', () => {
      expect(createByIndexAndSize(3, 4)).toEqual([0, 0, 0, 1]);
    });

    // 2. Single element array
    it('creates a single element array with 1', () => {
      expect(createByIndexAndSize(0, 1)).toEqual([1]);
    });

    // 3. Larger arrays
    it('works correctly with a larger array', () => {
      const result = createByIndexAndSize(4, 7);
      expect(result).toEqual([0, 0, 0, 0, 1, 0, 0]);
      expect(result.length).toBe(7);
    });

    // 4. All other elements are 0
    it('ensures all elements other than the specified index are 0', () => {
      const result = createByIndexAndSize(2, 5);
      for (let i = 0; i < 5; i++) {
        if (i === 2) {
          expect(result[i]).toBe(1);
        } else {
          expect(result[i]).toBe(0);
        }
      }
    });

    // 5. Returns an array of the correct size
    it('returns an array of the specified size', () => {
      expect(createByIndexAndSize(0, 10).length).toBe(10);
      expect(createByIndexAndSize(0, 1).length).toBe(1);
    });

    // 6. Exactly one element is 1
    it('contains exactly one element equal to 1', () => {
      const result = createByIndexAndSize(3, 6);
      const onesCount = result.filter((v) => v === 1).length;
      expect(onesCount).toBe(1);
    });
  });
});