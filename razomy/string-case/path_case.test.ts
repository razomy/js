import { pathCase } from '@razomy/string-case';

describe('string', () => {
  describe('path_case', () => {
    // 1. Standard casing styles
    it('keeps path/case', () => {
      expect(pathCase('path/case')).toBe('path/case');
    });

    it('converts camelCase', () => {
      expect(pathCase('camelCase')).toBe('camel/case');
    });

    it('converts PascalCase', () => {
      expect(pathCase('PascalCase')).toBe('pascal/case');
    });

    it('converts kebab-case', () => {
      expect(pathCase('kebab-case')).toBe('kebab/case');
    });

    it('converts snake_case', () => {
      expect(pathCase('snake_case')).toBe('snake/case');
    });

    it('converts sentence casing', () => {
      expect(pathCase('Hello World')).toBe('hello/world');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(pathCase('foo.bar|baz')).toBe('foo/bar/baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(pathCase('__foo_bar__')).toBe('foo/bar');
      expect(pathCase('/foo/bar/')).toBe('foo/bar');
    });

    it('handles repeated delimiters', () => {
      expect(pathCase('foo   bar--baz')).toBe('foo/bar/baz');
    });

    // 3. Special Characters
    it('removes special characters (destructive)', () => {
      expect(pathCase('user@email.com')).toBe('user/email/com');
      expect(pathCase('foo#bar')).toBe('foo/bar');
      expect(pathCase('$$money$$')).toBe('money');
    });

    // 4. Numbers
    it('handles numbers within delimiters', () => {
      expect(pathCase('version.2.0')).toBe('version/2/0');
      expect(pathCase('foo_123_bar')).toBe('foo/123/bar');
    });

    it('does not split numbers adjacent to letters (unlike camelCase)', () => {
      // The provided pathCase logic only splits on [a-z][A-Z] or non-alphanumeric
      expect(pathCase('version2beta')).toBe('version2beta');
      expect(pathCase('h2o')).toBe('h2o');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(pathCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(pathCase('A')).toBe('a');
    });

    it('handles Acronyms as single words (unless delimited)', () => {
      // Logic only splits [a-z] followed by [A-Z]
      expect(pathCase('JSONData')).toBe('jsondata');
      expect(pathCase('JSON_Data')).toBe('json/data');
    });
  });
});
