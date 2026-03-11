import { isEmpty } from './is_empty';

describe('array', () => {
  describe('isEmpty', () => {
    // 1. Empty arrays
    it('returns true for an empty array', () => {
      expect(isEmpty([])).toBe(true);
    });

    // 2. Non-empty arrays
    it('returns false for an array with one element', () => {
      expect(isEmpty([1])).toBe(false);
    });

    it('returns false for an array with multiple elements', () => {
      expect(isEmpty(['a', 'b'])).toBe(false);
    });

    // 3. Different data types
    it('returns false for an array of objects', () => {
      expect(isEmpty([{ name: 'Alice' }])).toBe(false);
    });

    it('returns false for an array containing undefined', () => {
      expect(isEmpty([undefined])).toBe(false);
    });

    it('returns false for an array containing null', () => {
      expect(isEmpty([null])).toBe(false);
    });

    it('returns false for an array containing an empty string', () => {
      expect(isEmpty([''])).toBe(false);
    });

    it('returns false for an array containing zero', () => {
      expect(isEmpty([0])).toBe(false);
    });

    // 4. Readonly arrays
    it('works correctly with readonly arrays', () => {
      const readonlyArray: readonly number[] = [];
      expect(isEmpty(readonlyArray)).toBe(true);

      const readonlyNonEmpty: readonly number[] = [1, 2, 3];
      expect(isEmpty(readonlyNonEmpty)).toBe(false);
    });

    // 5. Nested arrays
    it('returns false for an array containing an empty array', () => {
      expect(isEmpty([[]])).toBe(false);
    });
  });
});
