import * as string from "@razomy/string";

describe('string', () => {
  describe('indentLines', () => {
    // 1. Standard cases
    it('adds a single space margin on both sides', () => {
      expect(string.indentLines('a', 1)).toBe(' a');
    });

    it('adds a double space margin on both sides', () => {
      expect(string.indentLines('b', 2)).toBe('  b');
    });

    it('adds a larger space margin on both sides', () => {
      expect(string.indentLines('hello', 5)).toBe('     hello');
    });

    // 2. Zero size
    it('returns the original string when size is 0', () => {
      expect(string.indentLines('c', 0)).toBe('c');
    });

    // 3. Empty string
    it('returns only spaces when value is an empty string', () => {
      expect(string.indentLines('', 3)).toBe('   ');
    });

    it('returns an empty string when both value is empty and size is 0', () => {
      expect(string.indentLines('', 0)).toBe('');
    });

    // 4. Multi-character strings
    it('works correctly with multi-character strings', () => {
      expect(string.indentLines('hello', 1)).toBe(' hello');
    });

    it('works correctly with multi-word strings', () => {
      expect(string.indentLines('hello world', 2)).toBe('  hello world');
    });

    // 5. Strings with existing spaces
    it('adds margin to strings that already have spaces', () => {
      expect(string.indentLines(' a ', 1)).toBe('  a ');
    });

    // 6. Special characters
    it('works correctly with special characters', () => {
      expect(string.indentLines('!@#', 2)).toBe('  !@#');
    });

    it('works correctly with unicode characters', () => {
      expect(string.indentLines('🎉', 1)).toBe(' 🎉');
    });

    // 7. Large size
    it('handles a large margin size', () => {
      const result = string.indentLines('x', 10);
      expect(result).toBe('          x');
      expect(result.length).toBe(11);
    });

    // 8. Newline and tab characters
    it('works correctly with strings containing newlines', () => {
      expect(string.indentLines('a\nb', 1)).toBe(' a\n b');
    });

    it('works correctly with strings containing tabs', () => {
      expect(string.indentLines('a\tb', 1)).toBe(' a\tb');
    });

    it('works correctly with strings containing new lines', () => {
      expect(string.indentLines('a\nb', 1)).toBe(' a\n b');
    });
  });
});
