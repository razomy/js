import * as stringCase from "@razomy/string-case";

describe('string', () => {
  describe('reverse', () => {
    // 1. Standard usage
    it('reverses a simple string', () => {
      expect(stringCase.reverse('abc')).toBe('cba');
    });

    it('reverses a longer string', () => {
      expect(stringCase.reverse('qwerty')).toBe('ytrewq');
    });

    it('reverses a sentence with spaces', () => {
      expect(stringCase.reverse('Hello World')).toBe('dlroW olleH');
    });

    // 2. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.reverse('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.reverse('A')).toBe('A');
    });

    it('handles palindromes', () => {
      expect(stringCase.reverse('racecar')).toBe('racecar');
      expect(stringCase.reverse('12321')).toBe('12321');
    });

    // 3. Special Characters & Numbers
    it('reverses numeric strings', () => {
      expect(stringCase.reverse('12345')).toBe('54321');
    });

    it('handles mixed special characters', () => {
      expect(stringCase.reverse('!@#$%')).toBe('%$#@!');
      expect(stringCase.reverse('a-b-c')).toBe('c-b-a');
    });

    // 4. Unicode & Emojis
    it('handles unicode characters (surrogate pairs) correctly', () => {
      // The implementation uses spread syntax [...text] which handles code points
      expect(stringCase.reverse('foo 𝌆 bar')).toBe('rab 𝌆 oof');
      expect(stringCase.reverse('👍👎')).toBe('👎👍');
      expect(stringCase.reverse('mañana')).toBe('anañam');
    });
  });
});
