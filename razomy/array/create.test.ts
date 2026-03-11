import { create } from './create';

describe('array', () => {
  describe('create', () => {
    // 1. Standard cases
    it('creates an array of specific size filled with a number', () => {
      expect(create(3, 0)).toEqual([0, 0, 0]);
    });

    it('creates an array of specific size filled with a string', () => {
      expect(create(2, 'x')).toEqual(['x', 'x']);
    });

    it('creates an array of specific size filled with a boolean', () => {
      expect(create(4, true)).toEqual([true, true, true, true]);
    });

    // 2. Edge cases with size
    it('creates an empty array when size is 0', () => {
      expect(create(0, 'anything')).toEqual([]);
    });

    it('creates an array with a single element when size is 1', () => {
      expect(create(1, 42)).toEqual([42]);
    });

    // 3. Different value types
    it('creates an array filled with null', () => {
      expect(create(3, null)).toEqual([null, null, null]);
    });

    it('creates an array filled with undefined', () => {
      expect(create(2, undefined)).toEqual([undefined, undefined]);
    });

    it('creates an array filled with an object reference', () => {
      const obj = { key: 'value' };
      const result = create(3, obj);
      expect(result).toEqual([{ key: 'value' }, { key: 'value' }, { key: 'value' }]);
      // All elements should reference the same object
      expect(result[0]).toBe(result[1]);
      expect(result[1]).toBe(result[2]);
    });

    it('creates an array filled with an array reference', () => {
      const arr = [1, 2];
      const result = create(2, arr);
      expect(result).toEqual([[1, 2], [1, 2]]);
      expect(result[0]).toBe(result[1]);
    });

    // 4. Correct length
    it('returns an array with the correct length', () => {
      expect(create(5, 'a')).toHaveLength(5);
    });

    it('returns an array with length 0 for size 0', () => {
      expect(create(0, 'a')).toHaveLength(0);
    });

    // 5. Large array
    it('creates a large array filled with the correct value', () => {
      const size = 1000;
      const result = create(size, 7);
      expect(result).toHaveLength(size);
      expect(result.every((v) => v === 7)).toBe(true);
    });
  });
});