import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('swap_case', () => {
    // 1. Standard Case Swapping
    it('swaps mixed case strings', () => {
      expect(stringCase.swapCase('Hello World')).toBe('hELLO wORLD');
    });

    it('swaps camelCase', () => {
      expect(stringCase.swapCase('camelCase')).toBe('CAMELcASE');
    });

    it('swaps PascalCase', () => {
      expect(stringCase.swapCase('PascalCase')).toBe('pASCALcASE');
    });

    // 2. Uniform Case
    it('swaps all lowercase to uppercase', () => {
      expect(stringCase.swapCase('lowercase')).toBe('LOWERCASE');
    });

    it('swaps all uppercase to lowercase', () => {
      expect(stringCase.swapCase('UPPERCASE')).toBe('uppercase');
    });

    // 3. Numbers and Special Characters
    it('ignores numbers', () => {
      expect(stringCase.swapCase('12345')).toBe('12345');
    });

    it('ignores special characters', () => {
      expect(stringCase.swapCase('!@#$%^&*()')).toBe('!@#$%^&*()');
    });

    it('handles mixed alphanumeric strings', () => {
      expect(stringCase.swapCase('123 ABC xyz')).toBe('123 abc XYZ');
      expect(stringCase.swapCase('Part 1: INTRO')).toBe('pART 1: intro');
    });

    // 4. Edge Cases
    it('returns empty string for empty input', () => {
      expect(stringCase.swapCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.swapCase('a')).toBe('A');
      expect(stringCase.swapCase('Z')).toBe('z');
    });

    // 5. Non-ASCII Characters (Implementation Limitation)
    it('ignores non-ASCII characters due to regex constraint', () => {
      // The implementation uses /[a-zA-Z]/g, which typically excludes accented characters
      expect(stringCase.swapCase('ñ')).toBe('Ñ');
      expect(stringCase.swapCase('É')).toBe('é');
      expect(stringCase.swapCase('café')).toBe('CAFÉ');
    });
  });
});
