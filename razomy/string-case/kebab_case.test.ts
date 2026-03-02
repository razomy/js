import { kebabCase } from '@razomy/string-case';

describe('string', () => {
  describe('kebab_case', () => {
    // 1. Standard casing styles
    it('keeps kebab-case', () => {
      expect(kebabCase('kebab-case')).toBe('kebab-case');
    });

    it('converts PascalCase', () => {
      expect(kebabCase('PascalCase')).toBe('pascal-case');
    });

    it('converts camelCase', () => {
      expect(kebabCase('camelCase')).toBe('camel-case');
    });

    it('converts snake_case', () => {
      expect(kebabCase('snake_case')).toBe('snake-case');
    });

    it('converts sentence casing', () => {
      expect(kebabCase('Foo Bar')).toBe('foo-bar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, spaces)', () => {
      expect(kebabCase('foo.bar baz')).toBe('foo-bar-baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(kebabCase('__foo_bar__')).toBe('foo-bar');
      expect(kebabCase('-foo-bar-')).toBe('foo-bar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(kebabCase('a-AA')).toBe('a-aa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(kebabCase('JSONData')).toBe('json-data');
    });

    it('handles acronyms in middle', () => {
      expect(kebabCase('serverHTTPResponse')).toBe('server-http-response');
    });

    it('handles acronyms at end', () => {
      expect(kebabCase('parseXML')).toBe('parse-xml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      // 'version2beta' -> 'version-2-beta'
      expect(kebabCase('version2beta')).toBe('version-2-beta');
      // 'h2o' -> 'h-2-o'
      expect(kebabCase('h2o')).toBe('h-2-o');
    });

    it('handles numbers correctly in snake/mixed case', () => {
      expect(kebabCase('version_10_beta')).toBe('version-10-beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(kebabCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(kebabCase('A')).toBe('a');
    });

    // 1. Data Preservation
    it('preserves special characters (non-destructive)', () => {
      expect(kebabCase('C#Project')).toBe('c#project');
      expect(kebabCase('user@email.com')).toBe('user@email-com');
      expect(kebabCase('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling
    it('splits numbers adjacent to letters', () => {
      expect(kebabCase('version2beta')).toBe('version-2-beta');
      expect(kebabCase('foo123bar')).toBe('foo-123-bar');
      expect(kebabCase('404error')).toBe('404-error');
    });

    // 3. Standard Cases
    it('handles standard snake and pascal case', () => {
      expect(kebabCase('snake_case')).toBe('snake-case');
      expect(kebabCase('PascalCase')).toBe('pascal-case');
    });

    it('handles acronyms intelligently', () => {
      expect(kebabCase('JSONData')).toBe('json-data');
      expect(kebabCase('XMLHttpRequest')).toBe('xml-http-request');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(kebabCase('foo  bar')).toBe('foo-bar');
      expect(kebabCase('foo-bar.baz')).toBe('foo-bar-baz');
      expect(kebabCase('a-AA')).toBe('a-aa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(kebabCase('')).toBe('');
    });
  });
});
