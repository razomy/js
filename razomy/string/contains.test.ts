import { contains } from './contains';

describe('string', () => {
  describe('contains', () => {
    // 1. Standard cases
    it('returns true if the string contains the substring', () => {
      expect(contains('razomy', 'zo')).toBe(true);
    });

    it('returns false if the string does not contain the substring', () => {
      expect(contains('razomy', 'bar')).toBe(false);
    });

    it('returns true when searching for a substring at the beginning', () => {
      expect(contains('hello world', 'hello')).toBe(true);
    });

    it('returns true when searching for a substring at the end', () => {
      expect(contains('hello world', 'world')).toBe(true);
    });

    it('returns true when searching for a substring in the middle', () => {
      expect(contains('hello world', 'lo wo')).toBe(true);
    });

    // 2. Empty string cases
    it('returns true when searching for an empty string in a non-empty string', () => {
      expect(contains('hello', '')).toBe(true);
    });

    it('returns true when both text and search are empty strings', () => {
      expect(contains('', '')).toBe(true);
    });

    it('returns false when searching for a non-empty string in an empty string', () => {
      expect(contains('', 'foo')).toBe(false);
    });

    // 3. Exact match
    it('returns true when the search string is identical to the text', () => {
      expect(contains('hello', 'hello')).toBe(true);
    });

    // 4. Case sensitivity
    it('is case-sensitive and returns false for mismatched casing', () => {
      expect(contains('Hello World', 'hello')).toBe(false);
    });

    it('returns true when casing matches exactly', () => {
      expect(contains('Hello World', 'Hello')).toBe(true);
    });

    // 5. Special characters
    it('handles special characters correctly', () => {
      expect(contains('foo@bar.com', '@bar')).toBe(true);
      expect(contains('hello\nworld', '\n')).toBe(true);
      expect(contains('tab\there', '\t')).toBe(true);
    });

    // 6. Search string longer than text
    it('returns false when the search string is longer than the text', () => {
      expect(contains('hi', 'hello world')).toBe(false);
    });

    // 7. Repeated patterns
    it('returns true when substring appears multiple times', () => {
      expect(contains('abcabc', 'abc')).toBe(true);
    });

    // 8. Single character cases
    it('works with single character text and search', () => {
      expect(contains('a', 'a')).toBe(true);
      expect(contains('a', 'b')).toBe(false);
    });

    // 9. Unicode characters
    it('handles unicode characters correctly', () => {
      expect(contains('café', 'fé')).toBe(true);
      expect(contains('こんにちは世界', '世界')).toBe(true);
      expect(contains('emoji 😀 test', '😀')).toBe(true);
    });

    // 10. Whitespace
    it('handles strings with only whitespace', () => {
      expect(contains('   ', ' ')).toBe(true);
      expect(contains('hello world', ' ')).toBe(true);
      expect(contains('helloworld', ' ')).toBe(false);
    });
  });
});