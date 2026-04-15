import * as string from "@razomy/string";

describe('string', () => {
  describe('contains', () => {
    // 1. Standard cases
    it('returns true if the string contains the substring', () => {
      expect(string.contains('razomy', 'zo')).toBe(true);
    });

    it('returns false if the string does not contain the substring', () => {
      expect(string.contains('razomy', 'bar')).toBe(false);
    });

    it('returns true when searching for a substring at the beginning', () => {
      expect(string.contains('hello world', 'hello')).toBe(true);
    });

    it('returns true when searching for a substring at the end', () => {
      expect(string.contains('hello world', 'world')).toBe(true);
    });

    it('returns true when searching for a substring in the middle', () => {
      expect(string.contains('hello world', 'lo wo')).toBe(true);
    });

    // 2. Empty string cases
    it('returns true when searching for an empty string in a non-empty string', () => {
      expect(string.contains('hello', '')).toBe(true);
    });

    it('returns true when both text and search are empty strings', () => {
      expect(string.contains('', '')).toBe(true);
    });

    it('returns false when searching for a non-empty string in an empty string', () => {
      expect(string.contains('', 'foo')).toBe(false);
    });

    // 3. Exact match
    it('returns true when the search string is identical to the text', () => {
      expect(string.contains('hello', 'hello')).toBe(true);
    });

    // 4. Case sensitivity
    it('is case-sensitive and returns false for mismatched casing', () => {
      expect(string.contains('Hello World', 'hello')).toBe(false);
    });

    it('returns true when casing matches exactly', () => {
      expect(string.contains('Hello World', 'Hello')).toBe(true);
    });

    // 5. Special characters
    it('handles special characters correctly', () => {
      expect(string.contains('foo@bar.com', '@bar')).toBe(true);
      expect(string.contains('hello\nworld', '\n')).toBe(true);
      expect(string.contains('tab\there', '\t')).toBe(true);
    });

    // 6. Search string longer than text
    it('returns false when the search string is longer than the text', () => {
      expect(string.contains('hi', 'hello world')).toBe(false);
    });

    // 7. Repeated patterns
    it('returns true when substring appears multiple times', () => {
      expect(string.contains('abcabc', 'abc')).toBe(true);
    });

    // 8. Single character cases
    it('works with single character text and search', () => {
      expect(string.contains('a', 'a')).toBe(true);
      expect(string.contains('a', 'b')).toBe(false);
    });

    // 9. Unicode characters
    it('handles unicode characters correctly', () => {
      expect(string.contains('café', 'fé')).toBe(true);
      expect(string.contains('こんにちは世界', '世界')).toBe(true);
      expect(string.contains('emoji 😀 test', '😀')).toBe(true);
    });

    // 10. Whitespace
    it('handles strings with only whitespace', () => {
      expect(string.contains('   ', ' ')).toBe(true);
      expect(string.contains('hello world', ' ')).toBe(true);
      expect(string.contains('helloworld', ' ')).toBe(false);
    });
  });
});
