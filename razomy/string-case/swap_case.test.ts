import { swapCase } from '@razomy/string-case';

describe('string', () => {
  describe('swap_case', () => {
    // 1. Standard Case Swapping
    it('swaps mixed case strings', () => {
      expect(swapCase('Hello World')).toBe('hELLO wORLD');
    });

    it('swaps camelCase', () => {
      expect(swapCase('camelCase')).toBe('CAMELcASE');
    });

    it('swaps PascalCase', () => {
      expect(swapCase('PascalCase')).toBe('pASCALcASE');
    });

    // 2. Uniform Case
    it('swaps all lowercase to uppercase', () => {
      expect(swapCase('lowercase')).toBe('LOWERCASE');
    });

    it('swaps all uppercase to lowercase', () => {
      expect(swapCase('UPPERCASE')).toBe('uppercase');
    });

    // 3. Numbers and Special Characters
    it('ignores numbers', () => {
      expect(swapCase('12345')).toBe('12345');
    });

    it('ignores special characters', () => {
      expect(swapCase('!@#$%^&*()')).toBe('!@#$%^&*()');
    });

    it('handles mixed alphanumeric strings', () => {
      expect(swapCase('123 ABC xyz')).toBe('123 abc XYZ');
      expect(swapCase('Part 1: INTRO')).toBe('pART 1: intro');
    });

    // 4. Edge Cases
    it('returns empty string for empty input', () => {
      expect(swapCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(swapCase('a')).toBe('A');
      expect(swapCase('Z')).toBe('z');
    });

    // 5. Non-ASCII Characters (Implementation Limitation)
    it('ignores non-ASCII characters due to regex constraint', () => {
      // The implementation uses /[a-zA-Z]/g, which typically excludes accented characters
      expect(swapCase('ñ')).toBe('ñ');
      expect(swapCase('É')).toBe('É');
      expect(swapCase('café')).toBe('CAFé'); // 'c', 'a', 'f' swap, 'é' stays
    });
  });
});
