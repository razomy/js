import * as string from "@razomy/string";

describe('string', () => {
  describe('replace', () => {
    // 1. Standard cases
    it('replaces all occurrences of a separator with a replacement', () => {
      expect(string.replace('a b c', ' ', '-')).toBe('a-b-c');
    });

    it('removes all occurrences when replacement is empty', () => {
      expect(string.replace('1,2,3,4,5', ',', '')).toBe('12345');
    });

    it('returns the original string when separator is not found', () => {
      expect(string.replace('foo', 'bar', 'baz')).toBe('foo');
    });

    // 2. Multiple occurrences
    it('replaces all occurrences, not just the first', () => {
      expect(string.replace('aaa', 'a', 'b')).toBe('bbb');
    });

    it('replaces multiple consecutive separators', () => {
      expect(string.replace('a--b--c', '--', '+')).toBe('a+b+c');
    });

    // 3. Empty string cases
    it('returns an empty string when input text is empty', () => {
      expect(string.replace('', ' ', '-')).toBe('');
    });

    it('returns the original string when separator is empty (splits every character)', () => {
      expect(string.replace('abc', '', '-')).toBe('a-b-c');
    });

    it('returns an empty string when both text and separator are empty', () => {
      expect(string.replace('', '', '-')).toBe('');
    });

    // 4. Separator at boundaries
    it('handles separator at the beginning of the string', () => {
      expect(string.replace(',a,b,c', ',', '|')).toBe('|a|b|c');
    });

    it('handles separator at the end of the string', () => {
      expect(string.replace('a,b,c,', ',', '|')).toBe('a|b|c|');
    });

    it('handles separator at both boundaries', () => {
      expect(string.replace(',a,b,', ',', '|')).toBe('|a|b|');
    });

    // 5. Replacement longer than separator
    it('works when replacement is longer than separator', () => {
      expect(string.replace('a-b-c', '-', '---')).toBe('a---b---c');
    });

    // 6. Replacement shorter than separator
    it('works when replacement is shorter than separator', () => {
      expect(string.replace('a---b---c', '---', '-')).toBe('a-b-c');
    });

    // 7. Same separator and replacement
    it('returns the same string when separator and replacement are the same', () => {
      expect(string.replace('a-b-c', '-', '-')).toBe('a-b-c');
    });

    // 8. Multi-character separator
    it('handles multi-character separators', () => {
      expect(string.replace('hello world hello world', 'hello', 'hi')).toBe('hi world hi world');
    });

    // 9. Special characters
    it('handles special characters in separator and replacement', () => {
      expect(string.replace('a.b.c', '.', '/')).toBe('a/b/c');
    });

    it('handles newline characters', () => {
      expect(string.replace('line1\nline2\nline3', '\n', ' ')).toBe('line1 line2 line3');
    });

    // 10. String with only separators
    it('handles a string made entirely of separators', () => {
      expect(string.replace('---', '-', '+')).toBe('+++');
    });

    it('handles a string that is exactly the separator', () => {
      expect(string.replace('abc', 'abc', 'xyz')).toBe('xyz');
    });

    // 11. No match single character
    it('returns original string when single-character separator is not present', () => {
      expect(string.replace('hello', 'x', 'y')).toBe('hello');
    });
  });
});
