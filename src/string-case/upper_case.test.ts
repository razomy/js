import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('upper_case', () => {
    // 1. Standard casing styles
    it('converts lowercase to uppercase', () => {
      expect(stringCase.upperCase('test')).toBe('TEST');
    });

    it('converts mixed case to uppercase', () => {
      expect(stringCase.upperCase('Hello World')).toBe('HELLO WORLD');
    });

    it('keeps already uppercase strings', () => {
      expect(stringCase.upperCase('RAZOMY')).toBe('RAZOMY');
    });

    // 2. Handling Special Characters & Numbers
    it('preserves numbers', () => {
      expect(stringCase.upperCase('123')).toBe('123');
      expect(stringCase.upperCase('test 123')).toBe('TEST 123');
    });

    it('preserves special characters', () => {
      expect(stringCase.upperCase('foo-bar')).toBe('FOO-BAR');
      expect(stringCase.upperCase('foo_bar')).toBe('FOO_BAR');
      expect(stringCase.upperCase('user@example.com')).toBe('USER@EXAMPLE.COM');
    });

    // 3. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.upperCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.upperCase('a')).toBe('A');
      expect(stringCase.upperCase('z')).toBe('Z');
    });
  });
});
