import { isEndsWith } from './is_ends_with';

describe('string', () => {
  describe('isEndsWith', () => {
    // 1. Standard cases
    it('returns true if string ends with the target', () => {
      expect(isEndsWith('abc', 'c')).toBe(true);
    });

    it('returns false if string does not end with the target', () => {
      expect(isEndsWith('abc', 'b')).toBe(false);
    });

    it('returns true if string ends with a multi-character target', () => {
      expect(isEndsWith('abc', 'bc')).toBe(true);
    });

    it('returns false if string does not end with a multi-character target', () => {
      expect(isEndsWith('abc', 'ab')).toBe(false);
    });

    // 2. Position parameter
    it('returns true if string ends with target up to the given position', () => {
      expect(isEndsWith('abc', 'b', 2)).toBe(true);
    });

    it('returns false if string does not end with target up to the given position', () => {
      expect(isEndsWith('abc', 'c', 2)).toBe(false);
    });

    it('returns true if string ends with target at position 1', () => {
      expect(isEndsWith('abc', 'a', 1)).toBe(true);
    });

    it('returns true when position equals text length (same as no position)', () => {
      expect(isEndsWith('abc', 'c', 3)).toBe(true);
    });

    // 3. Empty strings
    it('returns true if target is an empty string', () => {
      expect(isEndsWith('abc', '')).toBe(true);
    });

    it('returns true if both text and target are empty strings', () => {
      expect(isEndsWith('', '')).toBe(true);
    });

    it('returns false if text is empty and target is not', () => {
      expect(isEndsWith('', 'a')).toBe(false);
    });

    // 4. Target equals text
    it('returns true if target equals the entire text', () => {
      expect(isEndsWith('abc', 'abc')).toBe(true);
    });

    // 5. Target longer than text
    it('returns false if target is longer than text', () => {
      expect(isEndsWith('abc', 'abcd')).toBe(false);
    });

    // 6. Position edge cases
    it('returns true for empty target when position is 0', () => {
      expect(isEndsWith('abc', '', 0)).toBe(true);
    });

    it('returns false for non-empty target when position is 0', () => {
      expect(isEndsWith('abc', 'a', 0)).toBe(false);
    });

    it('handles position greater than text length', () => {
      expect(isEndsWith('abc', 'c', 100)).toBe(true);
    });

    // 7. Case sensitivity
    it('is case-sensitive', () => {
      expect(isEndsWith('abc', 'C')).toBe(false);
      expect(isEndsWith('ABC', 'c')).toBe(false);
      expect(isEndsWith('ABC', 'C')).toBe(true);
    });

    // 8. Special characters
    it('works with special characters', () => {
      expect(isEndsWith('hello world!', '!')).toBe(true);
      expect(isEndsWith('hello\nworld', 'world')).toBe(true);
      expect(isEndsWith('path/to/file', 'file')).toBe(true);
    });

    // 9. Single character strings
    it('works with single character strings', () => {
      expect(isEndsWith('a', 'a')).toBe(true);
      expect(isEndsWith('a', 'b')).toBe(false);
    });
  });
});
