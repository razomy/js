import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('path_case', () => {
    // 1. Standard casing styles
    it('keeps path/case', () => {
      expect(stringCase.pathCase('path/case')).toBe('path/case');
    });

    it('converts camelCase', () => {
      expect(stringCase.pathCase('camelCase')).toBe('camel/case');
    });

    it('converts PascalCase', () => {
      expect(stringCase.pathCase('PascalCase')).toBe('pascal/case');
    });

    it('converts kebab-case', () => {
      expect(stringCase.pathCase('kebab-case')).toBe('kebab/case');
    });

    it('converts snake_case', () => {
      expect(stringCase.pathCase('snake_case')).toBe('snake/case');
    });

    it('converts sentence casing', () => {
      expect(stringCase.pathCase('Hello World')).toBe('hello/world');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(stringCase.pathCase('foo.bar|baz')).toBe('foo/bar/baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(stringCase.pathCase('__foo_bar__')).toBe('foo/bar');
      expect(stringCase.pathCase('/foo/bar/')).toBe('foo/bar');
    });

    it('handles repeated delimiters', () => {
      expect(stringCase.pathCase('foo   bar--baz')).toBe('foo/bar/baz');
    });

    // 3. Special Characters
    it('removes special characters (destructive)', () => {
      expect(stringCase.pathCase('user@email.com')).toBe('user/email/com');
      expect(stringCase.pathCase('foo#bar')).toBe('foo/bar');
      expect(stringCase.pathCase('$$money$$')).toBe('money');
    });

    // 4. Numbers
    it('handles numbers within delimiters', () => {
      expect(stringCase.pathCase('version.2.0')).toBe('version/2/0');
      expect(stringCase.pathCase('foo_123_bar')).toBe('foo/123/bar');
    });

    it('does not split numbers adjacent to letters (unlike camelCase)', () => {
      // The provided pathCase logic only splits on [a-z][A-Z] or non-alphanumeric
      expect(stringCase.pathCase('version2beta')).toBe('version2beta');
      expect(stringCase.pathCase('h2o')).toBe('h2o');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.pathCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.pathCase('A')).toBe('a');
    });

    it('handles Acronyms as single words (unless delimited)', () => {
      // Logic only splits [a-z] followed by [A-Z]
      expect(stringCase.pathCase('JSONData')).toBe('jsondata');
      expect(stringCase.pathCase('JSON_Data')).toBe('json/data');
    });
  });
});
