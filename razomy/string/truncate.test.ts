import * as string from "@razomy/string";

describe('string', () => {
  describe('truncate', () => {
    // 1. Standard cases
    it('truncates a string longer than the given length with default omission', () => {
      expect(string.truncate('hello world', 5)).toBe('he...');
    });

    it('returns the original string if it is shorter than the given length', () => {
      expect(string.truncate('hello', 10)).toBe('hello');
    });

    it('returns the original string if it is exactly the given length', () => {
      expect(string.truncate('hello', 5)).toBe('hello');
    });

    it('truncates with a custom omission string', () => {
      expect(string.truncate('hello world', 7, '...')).toBe('hell...');
    });

    // 2. Edge cases with omission
    it('handles a single character omission', () => {
      expect(string.truncate('hello world', 5, '!')).toBe('hell!');
    });

    it('handles an empty omission string', () => {
      expect(string.truncate('hello world', 5, '')).toBe('hello');
    });

    it('handles omission string equal to the length', () => {
      expect(string.truncate('hello world', 3, '...')).toBe('...');
    });

    it('handles omission string longer than the length', () => {
      expect(string.truncate('hello world', 2, '...')).toBe('hello worl...');
    });

    // 3. Empty string
    it('returns an empty string when text is empty', () => {
      expect(string.truncate('', 5)).toBe('');
    });

    it('returns an empty string when text is empty and length is 0', () => {
      expect(string.truncate('', 0)).toBe('');
    });

    // 4. Length of zero
    it('returns only the omission when length is 0 and text is non-empty', () => {
      expect(string.truncate('hello', 0)).toBe('he...');
    });

    // 5. Default omission
    it('uses "..." as the default omission', () => {
      expect(string.truncate('abcdefghij', 7)).toBe('abcd...');
    });

    // 6. Long omission with various texts
    it('handles a longer custom omission string', () => {
      expect(string.truncate('hello world', 10, ' [...]')).toBe('hell [...]');
    });

    // 7. Unicode and special characters
    it('works with strings containing special characters', () => {
      expect(string.truncate('héllo wörld', 6)).toBe('hél...');
    });

    // 8. Length is 1
    it('handles a length of 1 with default omission', () => {
      expect(string.truncate('hello', 1)).toBe('hel...');
    });

    // 9. No truncation needed for single character string
    it('does not truncate a single character string within length', () => {
      expect(string.truncate('a', 1)).toBe('a');
    });

    // 10. Large length value
    it('returns the original string when length is much larger', () => {
      expect(string.truncate('hello', 1000)).toBe('hello');
    });
  });
});
