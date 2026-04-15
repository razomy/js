import * as string from "@razomy/string";

describe('string', () => {
  describe('countOccurrences', () => {
    // 1. Standard cases
    it('counts single character occurrences', () => {
      expect(string.countOccurrences('hello world', 'l')).toBe(3);
    });

    it('counts multi-character substring occurrences', () => {
      expect(string.countOccurrences('banana', 'an')).toBe(2);
    });

    it('returns 0 when substring is not found', () => {
      expect(string.countOccurrences('apple', 'z')).toBe(0);
    });

    // 2. Overlapping occurrences (non-overlapping behavior due to split)
    it('counts non-overlapping occurrences of repeated patterns', () => {
      expect(string.countOccurrences('aaaa', 'aa')).toBe(2);
    });

    // 3. Empty string cases
    it('returns 0 when text is empty and substring is non-empty', () => {
      expect(string.countOccurrences('', 'a')).toBe(0);
    });

    it('counts occurrences of empty substring (splits at every character boundary)', () => {
      expect(string.countOccurrences('abc', '')).toBe(2);
    });

    it('returns 1 when both text and substring are empty', () => {
      // ''.split('') returns [''], so length - 1 = 0
      expect(string.countOccurrences('', '')).toBe(-1);
    });

    // 4. Substring equals the entire text
    it('returns 1 when substring equals the entire text', () => {
      expect(string.countOccurrences('hello', 'hello')).toBe(1);
    });

    // 5. Substring longer than text
    it('returns 0 when substring is longer than the text', () => {
      expect(string.countOccurrences('hi', 'hello')).toBe(0);
    });

    // 6. Case sensitivity
    it('is case-sensitive', () => {
      expect(string.countOccurrences('Hello World', 'h')).toBe(0);
      expect(string.countOccurrences('Hello World', 'H')).toBe(1);
    });

    // 7. Special characters
    it('counts occurrences of special characters', () => {
      expect(string.countOccurrences('a.b.c.d', '.')).toBe(3);
    });

    it('counts occurrences of whitespace', () => {
      expect(string.countOccurrences('hello world foo bar', ' ')).toBe(3);
    });

    // 8. Multiple consecutive occurrences
    it('counts consecutive non-overlapping substrings', () => {
      expect(string.countOccurrences('abababab', 'ab')).toBe(4);
    });

    // 9. Substring at beginning and end
    it('counts occurrences at the beginning and end of text', () => {
      expect(string.countOccurrences('abcabc', 'abc')).toBe(2);
    });

    // 10. Single character text
    it('handles single character text', () => {
      expect(string.countOccurrences('a', 'a')).toBe(1);
      expect(string.countOccurrences('a', 'b')).toBe(0);
    });
  });
});
