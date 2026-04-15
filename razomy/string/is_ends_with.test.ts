import * as string from '@razomy/string';

describe('string', () => {
  describe('isEndsWith', () => {
    // 1. Standard cases
    it('returns true if string ends with the target', () => {
      expect(string.isEndsWith('abc', 'c')).toBe(true);
    });

    it('returns false if string does not end with the target', () => {
      expect(string.isEndsWith('abc', 'b')).toBe(false);
    });

    it('returns true if string ends with a multi-character target', () => {
      expect(string.isEndsWith('abc', 'bc')).toBe(true);
    });

    it('returns false if string does not end with a multi-character target', () => {
      expect(string.isEndsWith('abc', 'ab')).toBe(false);
    });

    // 2. Position parameter
    it('returns true if string ends with target up to the given position', () => {
      expect(string.isEndsWith('abc', 'b', 2)).toBe(true);
    });

    it('returns false if string does not end with target up to the given position', () => {
      expect(string.isEndsWith('abc', 'c', 2)).toBe(false);
    });

    it('returns true if string ends with target at position 1', () => {
      expect(string.isEndsWith('abc', 'a', 1)).toBe(true);
    });

    it('returns true when position equals text length (same as no position)', () => {
      expect(string.isEndsWith('abc', 'c', 3)).toBe(true);
    });

    // 3. Empty strings
    it('returns true if target is an empty string', () => {
      expect(string.isEndsWith('abc', '')).toBe(true);
    });

    it('returns true if both text and target are empty strings', () => {
      expect(string.isEndsWith('', '')).toBe(true);
    });

    it('returns false if text is empty and target is not', () => {
      expect(string.isEndsWith('', 'a')).toBe(false);
    });

    // 4. Target equals text
    it('returns true if target equals the entire text', () => {
      expect(string.isEndsWith('abc', 'abc')).toBe(true);
    });

    // 5. Target longer than text
    it('returns false if target is longer than text', () => {
      expect(string.isEndsWith('abc', 'abcd')).toBe(false);
    });

    // 6. Position edge cases
    it('returns true for empty target when position is 0', () => {
      expect(string.isEndsWith('abc', '', 0)).toBe(true);
    });

    it('returns false for non-empty target when position is 0', () => {
      expect(string.isEndsWith('abc', 'a', 0)).toBe(false);
    });

    it('handles position greater than text length', () => {
      expect(string.isEndsWith('abc', 'c', 100)).toBe(true);
    });

    // 7. Case sensitivity
    it('is case-sensitive', () => {
      expect(string.isEndsWith('abc', 'C')).toBe(false);
      expect(string.isEndsWith('ABC', 'c')).toBe(false);
      expect(string.isEndsWith('ABC', 'C')).toBe(true);
    });

    // 8. Special characters
    it('works with special characters', () => {
      expect(string.isEndsWith('hello world!', '!')).toBe(true);
      expect(string.isEndsWith('hello\nworld', 'world')).toBe(true);
      expect(string.isEndsWith('path/to/file', 'file')).toBe(true);
    });

    // 9. Single character strings
    it('works with single character strings', () => {
      expect(string.isEndsWith('a', 'a')).toBe(true);
      expect(string.isEndsWith('a', 'b')).toBe(false);
    });
  });
});
