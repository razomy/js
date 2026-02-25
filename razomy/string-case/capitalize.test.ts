import { capitalize } from '@razomy/string-case';

describe('string', () => {
  describe('capitalize', () => {
    // 1. Standard Capitalization
    it('capitalizes the first character of a lowercase string', () => {
      expect(capitalize('razomy')).toBe('Razomy');
    });

    it('keeps the first character upper case if already capitalized', () => {
      expect(capitalize('Razomy')).toBe('Razomy');
    });

    // 2. Case Normalization
    it('lowercases the rest of the string for uppercase input', () => {
      expect(capitalize('RAZOMY')).toBe('Razomy');
    });

    it('lowercases the rest of the string for mixed case input', () => {
      expect(capitalize('rAZOMY')).toBe('Razomy');
    });

    // 3. Edge Cases
    it('returns empty string for empty input', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles single characters', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    // 4. Non-Alphabetic Characters
    it('handles strings starting with numbers', () => {
      expect(capitalize('123test')).toBe('123test');
    });

    it('handles strings starting with special characters', () => {
      expect(capitalize('--option')).toBe('--option');
    });

    it('handles strings with leading whitespace', () => {
      expect(capitalize('  foo')).toBe('  foo');
    });
  });
});