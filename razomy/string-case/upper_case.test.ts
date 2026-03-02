import { upperCase } from '@razomy/string-case';

describe('string', () => {
  describe('upper_case', () => {
    // 1. Standard casing styles
    it('converts lowercase to uppercase', () => {
      expect(upperCase('test')).toBe('TEST');
    });

    it('converts mixed case to uppercase', () => {
      expect(upperCase('Hello World')).toBe('HELLO WORLD');
    });

    it('keeps already uppercase strings', () => {
      expect(upperCase('RAZOMY')).toBe('RAZOMY');
    });

    // 2. Handling Special Characters & Numbers
    it('preserves numbers', () => {
      expect(upperCase('123')).toBe('123');
      expect(upperCase('test 123')).toBe('TEST 123');
    });

    it('preserves special characters', () => {
      expect(upperCase('foo-bar')).toBe('FOO-BAR');
      expect(upperCase('foo_bar')).toBe('FOO_BAR');
      expect(upperCase('user@example.com')).toBe('USER@EXAMPLE.COM');
    });

    // 3. Edge cases
    it('returns empty string for empty input', () => {
      expect(upperCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(upperCase('a')).toBe('A');
      expect(upperCase('z')).toBe('Z');
    });
  });
});
