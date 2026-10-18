import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('lower_case', () => {
    // 1. Standard Conversions
    it('converts uppercase to lowercase', () => {
      expect(stringCase.lowerCase('RAZOMY')).toBe('razomy');
    });

    it('keeps lowercase as is', () => {
      expect(stringCase.lowerCase('razomy')).toBe('razomy');
    });

    it('converts mixed case', () => {
      expect(stringCase.lowerCase('Test')).toBe('test');
      expect(stringCase.lowerCase('PascalCase')).toBe('pascalcase');
    });

    // 2. Handling Delimiters & Spaces
    it('preserves spaces', () => {
      expect(stringCase.lowerCase('FOO Bar')).toBe('foo bar');
    });

    it('preserves delimiters', () => {
      expect(stringCase.lowerCase('FOO-BAR')).toBe('foo-bar');
      expect(stringCase.lowerCase('FOO_BAR')).toBe('foo_bar');
      expect(stringCase.lowerCase('Foo.Bar')).toBe('foo.bar');
    });

    // 3. Special Characters & Numbers
    it('preserves numbers', () => {
      expect(stringCase.lowerCase('123')).toBe('123');
      expect(stringCase.lowerCase('V1.0')).toBe('v1.0');
    });

    it('preserves special characters', () => {
      expect(stringCase.lowerCase('user@EMAIL.com')).toBe('user@email.com');
      expect(stringCase.lowerCase('$$MONEY$$')).toBe('$$money$$');
    });

    // 4. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.lowerCase('')).toBe('');
    });
  });
});
