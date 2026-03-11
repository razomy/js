import { padEnd } from './pad_end';

describe('string', () => {
  describe('padEnd', () => {
    // 1. Standard cases
    it('pads the end with spaces by default', () => {
      expect(padEnd('abc', 6)).toBe('abc   ');
    });

    it('pads the end with a specified character', () => {
      expect(padEnd('abc', 6, '0')).toBe('abc000');
    });

    it('pads the end with a multi-character string', () => {
      expect(padEnd('abc', 10, 'xy')).toBe('abcxyxyxyx');
    });

    // 2. No padding needed
    it('returns the original string if length is less than string length', () => {
      expect(padEnd('abc', 2)).toBe('abc');
    });

    it('returns the original string if length equals string length', () => {
      expect(padEnd('abc', 3)).toBe('abc');
    });

    it('returns the original string if length is 0', () => {
      expect(padEnd('abc', 0)).toBe('abc');
    });

    it('returns the original string if length is negative', () => {
      expect(padEnd('abc', -5)).toBe('abc');
    });

    // 3. Empty string input
    it('pads an empty string with spaces', () => {
      expect(padEnd('', 5)).toBe('     ');
    });

    it('pads an empty string with a specified character', () => {
      expect(padEnd('', 3, '*')).toBe('***');
    });

    // 4. Edge cases with padding string
    it('uses space as default when chars is not provided', () => {
      expect(padEnd('hi', 5)).toBe('hi   ');
    });

    it('truncates the padding string to fit the target length exactly', () => {
      expect(padEnd('abc', 5, 'xyz')).toBe('abcxy');
    });

    // 5. Single character input
    it('pads a single character string', () => {
      expect(padEnd('a', 4, '-')).toBe('a---');
    });

    // 6. Length equals 1 with longer string
    it('does not truncate the original string when length is 1', () => {
      expect(padEnd('hello', 1)).toBe('hello');
    });

    // // 7. Padding with special characters
    // it('pads with unicode characters', () => {
    //   expect(padEnd('ab', 5, '🌟')).toBe('ab🌟');
    // });

    it('pads with whitespace characters', () => {
      expect(padEnd('abc', 6, '\t')).toBe('abc\t\t\t');
    });

    // 8. Already exact length
    it('returns the same string when already at target length with custom chars', () => {
      expect(padEnd('abcde', 5, '0')).toBe('abcde');
    });
  });
});
