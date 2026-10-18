import * as string from '@razomy/string';

describe('string', () => {
  describe('escapeByString', () => {
    // 1. Standard cases
    it('escapes a dot separator', () => {
      expect(string.escapeByString('hello.world', '.')).toBe('hello\\.world');
    });

    it('escapes a pipe separator', () => {
      expect(string.escapeByString('a|b|c', '|')).toBe('a\\|b\\|c');
    });

    it('escapes multiple occurrences of the separator', () => {
      expect(string.escapeByString('a.b.c.d', '.')).toBe('a\\.b\\.c\\.d');
    });

    // 2. No match
    it('returns the original string when the separator is not found', () => {
      expect(string.escapeByString('no match here', ',')).toBe('no match here');
    });

    // 3. Empty strings
    it('returns an empty string when given an empty input string', () => {
      expect(string.escapeByString('', '.')).toBe('');
    });

    // 4. Separator at boundaries
    it('escapes separator at the beginning of the string', () => {
      expect(string.escapeByString('.hello', '.')).toBe('\\.hello');
    });

    it('escapes separator at the end of the string', () => {
      expect(string.escapeByString('hello.', '.')).toBe('hello\\.');
    });

    it('escapes separator at both beginning and end', () => {
      expect(string.escapeByString('.hello.', '.')).toBe('\\.hello\\.');
    });

    // 5. Consecutive separators
    it('escapes consecutive occurrences of the separator', () => {
      expect(string.escapeByString('a..b', '.')).toBe('a\\.\\.b');
    });

    // 6. Multi-character separator
    it('escapes a multi-character separator', () => {
      expect(string.escapeByString('hello::world::foo', '::')).toBe('hello\\::world\\::foo');
    });

    // 7. String that is only the separator
    it('escapes a string that is exactly the separator', () => {
      expect(string.escapeByString('.', '.')).toBe('\\.');
    });

    // 8. Separator that already contains a backslash
    it('escapes a separator that is a backslash itself', () => {
      expect(string.escapeByString('a\\b\\c', '\\')).toBe('a\\\\b\\\\c');
    });

    // 9. Special regex characters as separators
    it('escapes special regex characters used as separators', () => {
      expect(string.escapeByString('a*b*c', '*')).toBe('a\\*b\\*c');
      expect(string.escapeByString('a+b+c', '+')).toBe('a\\+b\\+c');
      expect(string.escapeByString('a?b?c', '?')).toBe('a\\?b\\?c');
    });

    // 10. Spaces as separator
    it('escapes spaces as the separator', () => {
      expect(string.escapeByString('hello world foo', ' ')).toBe('hello\\ world\\ foo');
    });

    // 11. Single character string with no match
    it('returns the original single character string when separator does not match', () => {
      expect(string.escapeByString('a', '.')).toBe('a');
    });
  });
});
