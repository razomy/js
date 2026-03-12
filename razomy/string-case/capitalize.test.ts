import * as stringCase from "@razomy/string-case";

describe('string', () => {
  describe('capitalize', () => {
    // 1. Standard Capitalization
    it('capitalizes the first character of a lowercase string', () => {
      expect(stringCase.capitalize('razomy')).toBe('Razomy');
    });

    it('keeps the first character upper case if already capitalized', () => {
      expect(stringCase.capitalize('Razomy')).toBe('Razomy');
    });

    // 2. Case Normalization
    it('lowercases the rest of the string for uppercase input', () => {
      expect(stringCase.capitalize('RAZOMY')).toBe('Razomy');
    });

    it('lowercases the rest of the string for mixed case input', () => {
      expect(stringCase.capitalize('rAZOMY')).toBe('Razomy');
    });

    // 3. Edge Cases
    it('returns empty string for empty input', () => {
      expect(stringCase.capitalize('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.capitalize('a')).toBe('A');
      expect(stringCase.capitalize('Z')).toBe('Z');
    });

    // 4. Non-Alphabetic Characters
    it('handles strings starting with numbers', () => {
      expect(stringCase.capitalize('123test')).toBe('123test');
    });

    it('handles strings starting with special characters', () => {
      expect(stringCase.capitalize('--option')).toBe('--option');
    });

    it('handles strings with leading whitespace', () => {
      expect(stringCase.capitalize('  foo')).toBe('  foo');
    });
  });
});
