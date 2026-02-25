import { lowerCase } from '@razomy/string-case';

describe('string', () => {
  describe('lower_case', () => {
    // 1. Standard Conversions
    it('converts uppercase to lowercase', () => {
      expect(lowerCase('RAZOMY')).toBe('razomy');
    });

    it('keeps lowercase as is', () => {
      expect(lowerCase('razomy')).toBe('razomy');
    });

    it('converts mixed case', () => {
      expect(lowerCase('Test')).toBe('test');
      expect(lowerCase('PascalCase')).toBe('pascalcase');
    });

    // 2. Handling Delimiters & Spaces
    it('preserves spaces', () => {
      expect(lowerCase('FOO Bar')).toBe('foo bar');
    });

    it('preserves delimiters', () => {
      expect(lowerCase('FOO-BAR')).toBe('foo-bar');
      expect(lowerCase('FOO_BAR')).toBe('foo_bar');
      expect(lowerCase('Foo.Bar')).toBe('foo.bar');
    });

    // 3. Special Characters & Numbers
    it('preserves numbers', () => {
      expect(lowerCase('123')).toBe('123');
      expect(lowerCase('V1.0')).toBe('v1.0');
    });

    it('preserves special characters', () => {
      expect(lowerCase('user@EMAIL.com')).toBe('user@email.com');
      expect(lowerCase('$$MONEY$$')).toBe('$$money$$');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(lowerCase('')).toBe('');
    });
  });
});