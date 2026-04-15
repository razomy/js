import * as string from '@razomy/string';

describe('string', () => {
  describe('merge', () => {
    // 1. Standard cases
    it('concatenates an array of single characters', () => {
      expect(string.merge(['a', 'b', 'c'])).toBe('abc');
    });

    it('concatenates an array of multi-character strings', () => {
      expect(string.merge(['ra', 'zo', 'my'])).toBe('razomy');
    });

    it('concatenates two strings', () => {
      expect(string.merge(['hello', ' world'])).toBe('hello world');
    });

    // 2. Empty cases
    it('returns an empty string for an empty array', () => {
      expect(string.merge([])).toBe('');
    });

    it('returns the same string when array has a single element', () => {
      expect(string.merge(['only'])).toBe('only');
    });

    // 3. Strings with special characters
    it('handles strings with spaces', () => {
      expect(string.merge(['hello ', 'world ', 'foo'])).toBe('hello world foo');
    });

    it('handles strings with special characters', () => {
      expect(string.merge(['@', '#', '$'])).toBe('@#$');
    });

    it('handles strings with newlines and tabs', () => {
      expect(string.merge(['line1\n', 'line2\t', 'line3'])).toBe('line1\nline2\tline3');
    });

    // 4. Empty strings within the array
    it('handles empty strings within the array', () => {
      expect(string.merge(['a', '', 'b', '', 'c'])).toBe('abc');
    });

    it('handles an array of all empty strings', () => {
      expect(string.merge(['', '', ''])).toBe('');
    });

    // 5. Unicode and emoji
    it('handles unicode characters', () => {
      expect(string.merge(['こん', 'にち', 'は'])).toBe('こんにちは');
    });

    it('handles emoji strings', () => {
      expect(string.merge(['😀', '🎉', '🚀'])).toBe('😀🎉🚀');
    });

    // 6. Larger arrays
    it('concatenates a larger array of strings', () => {
      const strings = Array.from({ length: 100 }, (_, i) => String(i));
      const expected = Array.from({ length: 100 }, (_, i) => String(i)).join('');
      expect(string.merge(strings)).toBe(expected);
    });
  });
});
