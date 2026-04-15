import * as string from "@razomy/string";

describe('string', () => {
  describe('padStart', () => {
    // 1. Standard cases
    it('pads the start with spaces by default', () => {
      expect(string.padStart('a', 3)).toBe('  a');
    });

    it('pads the start with a specified character', () => {
      expect(string.padStart('a', 3, '0')).toBe('00a');
    });

    it('pads the start with a multi-character string', () => {
      expect(string.padStart('a', 6, 'xy')).toBe('xyxyxa');
    });

    // 2. No padding needed
    it('returns the original string if it already meets the target length', () => {
      expect(string.padStart('abc', 3)).toBe('abc');
    });

    it('returns the original string if it exceeds the target length', () => {
      expect(string.padStart('abc', 2)).toBe('abc');
    });

    it('returns the original string if target length is 0', () => {
      expect(string.padStart('abc', 0)).toBe('abc');
    });

    // 3. Empty input string
    it('pads an empty string to the target length with spaces', () => {
      expect(string.padStart('', 3)).toBe('   ');
    });

    it('pads an empty string to the target length with a specified character', () => {
      expect(string.padStart('', 4, '-')).toBe('----');
    });

    // 4. Edge cases with chars
    it('handles an empty chars string (no padding applied)', () => {
      expect(string.padStart('a', 5, '')).toBe('a');
    });

    // 5. Target length equals input length
    it('returns the original string when target length equals input length', () => {
      expect(string.padStart('hello', 5)).toBe('hello');
    });

    // 6. Single character padding
    it('pads with a single character correctly', () => {
      expect(string.padStart('42', 5, '0')).toBe('00042');
    });

    // 7. Multi-character padding with truncation
    it('truncates the padding string if it does not fit evenly', () => {
      expect(string.padStart('a', 5, 'abc')).toBe('abcaa');
    });

    // 8. Negative target length
    it('returns the original string when target length is negative', () => {
      expect(string.padStart('abc', -1)).toBe('abc');
    });

    // 9. Unicode and special characters
    it('pads with special characters', () => {
      expect(string.padStart('end', 6, '*')).toBe('***end');
    });

    it('works with unicode characters in the input', () => {
      expect(string.padStart('é', 3, '0')).toBe('00é');
    });

    // 10. Large padding
    it('handles large target lengths', () => {
      const result = string.padStart('x', 100, '0');
      expect(result.length).toBe(100);
      expect(result).toBe('0'.repeat(99) + 'x');
    });
  });
});
