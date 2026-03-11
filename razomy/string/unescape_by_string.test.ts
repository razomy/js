import { unescapeByString } from './unescape_by_string';

describe('string', () => {
  describe('unescapeByString', () => {
    // 1. Standard cases
    it('unescapes a double quote character', () => {
      expect(unescapeByString('Content \\"quoted"', '"')).toBe('Content "quoted"');
    });

    it('unescapes a colon character', () => {
      expect(unescapeByString('a\\:b', ':')).toBe('a:b');
    });

    it('unescapes an equals sign', () => {
      expect(unescapeByString('key\\=value', '=')).toBe('key=value');
    });

    // 2. Multiple occurrences
    it('unescapes multiple occurrences of the same escape sequence', () => {
      expect(unescapeByString('a\\:b\\:c', ':')).toBe('a:b:c');
    });

    it('unescapes multiple escaped double quotes', () => {
      expect(unescapeByString('\\"hello\\" \\"world\\"', '"')).toBe('"hello" "world"');
    });

    // 3. No escape sequences present
    it('returns the original string if there are no escape sequences to unescape', () => {
      expect(unescapeByString('hello world', ':')).toBe('hello world');
    });

    it('returns the original string when the separator is not preceded by a backslash', () => {
      expect(unescapeByString('a:b:c', ':')).toBe('a:b:c');
    });

    // 4. Empty strings
    it('returns an empty string when given an empty string', () => {
      expect(unescapeByString('', ':')).toBe('');
    });

    it('returns the original string when the separate string is empty-ish edge case', () => {
      expect(unescapeByString('abc', '')).toBe('abc');
    });

    // 5. Backslashes not followed by the separator
    it('does not modify backslashes that are not followed by the separator', () => {
      expect(unescapeByString('a\\nb\\:c', ':')).toBe('a\\nb:c');
    });

    // 6. Multi-character separator
    it('unescapes a multi-character separator string', () => {
      expect(unescapeByString('a\\::b', '::')).toBe('a::b');
    });

    // 7. Separator is a backslash itself
    it('unescapes when the separator is a backslash', () => {
      expect(unescapeByString('a\\\\b', '\\')).toBe('a\\b');
    });

    // 8. String with only the escaped sequence
    it('handles a string that is only the escaped sequence', () => {
      expect(unescapeByString('\\:', ':')).toBe(':');
    });

    // 9. Adjacent escaped sequences
    it('handles adjacent escaped sequences', () => {
      expect(unescapeByString('\\:\\:', ':')).toBe('::');
    });

    // 10. No backslash present at all
    it('returns original string when no backslashes are present', () => {
      expect(unescapeByString('plain text', '=')).toBe('plain text');
    });
  });
});
