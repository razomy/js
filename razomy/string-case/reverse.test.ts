import { reverse } from './reverse';

describe('string', () => {
  describe('reverse', () => {
    // 1. Standard usage
    it('reverses a simple string', () => {
      expect(reverse('abc')).toBe('cba');
    });

    it('reverses a longer string', () => {
      expect(reverse('qwerty')).toBe('ytrewq');
    });

    it('reverses a sentence with spaces', () => {
      expect(reverse('Hello World')).toBe('dlroW olleH');
    });

    // 2. Edge cases
    it('returns empty string for empty input', () => {
      expect(reverse('')).toBe('');
    });

    it('handles single characters', () => {
      expect(reverse('A')).toBe('A');
    });

    it('handles palindromes', () => {
      expect(reverse('racecar')).toBe('racecar');
      expect(reverse('12321')).toBe('12321');
    });

    // 3. Special Characters & Numbers
    it('reverses numeric strings', () => {
      expect(reverse('12345')).toBe('54321');
    });

    it('handles mixed special characters', () => {
      expect(reverse('!@#$%')).toBe('%$#@!');
      expect(reverse('a-b-c')).toBe('c-b-a');
    });

    // 4. Unicode & Emojis
    it('handles unicode characters (surrogate pairs) correctly', () => {
      // The implementation uses spread syntax [...text] which handles code points
      expect(reverse('foo 𝌆 bar')).toBe('rab 𝌆 oof');
      expect(reverse('👍👎')).toBe('👎👍');
      expect(reverse('mañana')).toBe('anañam');
    });
  });
});