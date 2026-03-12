import * as stringCase from "@razomy/string-case";

describe('string', () => {
  describe('kebab_case', () => {
    // 1. Standard casing styles
    it('keeps kebab-case', () => {
      expect(stringCase.kebabCase('kebab-case')).toBe('kebab-case');
    });

    it('converts PascalCase', () => {
      expect(stringCase.kebabCase('PascalCase')).toBe('pascal-case');
    });

    it('converts camelCase', () => {
      expect(stringCase.kebabCase('camelCase')).toBe('camel-case');
    });

    it('converts snake_case', () => {
      expect(stringCase.kebabCase('snake_case')).toBe('snake-case');
    });

    it('converts sentence casing', () => {
      expect(stringCase.kebabCase('Foo Bar')).toBe('foo-bar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, spaces)', () => {
      expect(stringCase.kebabCase('foo.bar baz')).toBe('foo-bar-baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(stringCase.kebabCase('__foo_bar__')).toBe('foo-bar');
      expect(stringCase.kebabCase('-foo-bar-')).toBe('foo-bar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(stringCase.kebabCase('a-AA')).toBe('a-aa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(stringCase.kebabCase('JSONData')).toBe('json-data');
    });

    it('handles acronyms in middle', () => {
      expect(stringCase.kebabCase('serverHTTPResponse')).toBe('server-http-response');
    });

    it('handles acronyms at end', () => {
      expect(stringCase.kebabCase('parseXML')).toBe('parse-xml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      // 'version2beta' -> 'version-2-beta'
      expect(stringCase.kebabCase('version2beta')).toBe('version-2-beta');
      // 'h2o' -> 'h-2-o'
      expect(stringCase.kebabCase('h2o')).toBe('h-2-o');
    });

    it('handles numbers correctly in snake/mixed case', () => {
      expect(stringCase.kebabCase('version_10_beta')).toBe('version-10-beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.kebabCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.kebabCase('A')).toBe('a');
    });

    // 1. Data Preservation
    it('preserves special characters (non-destructive)', () => {
      expect(stringCase.kebabCase('C#Project')).toBe('c#project');
      expect(stringCase.kebabCase('user@email.com')).toBe('user@email-com');
      expect(stringCase.kebabCase('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling
    it('splits numbers adjacent to letters', () => {
      expect(stringCase.kebabCase('version2beta')).toBe('version-2-beta');
      expect(stringCase.kebabCase('foo123bar')).toBe('foo-123-bar');
      expect(stringCase.kebabCase('404error')).toBe('404-error');
    });

    // 3. Standard Cases
    it('handles standard snake and pascal case', () => {
      expect(stringCase.kebabCase('snake_case')).toBe('snake-case');
      expect(stringCase.kebabCase('PascalCase')).toBe('pascal-case');
    });

    it('handles acronyms intelligently', () => {
      expect(stringCase.kebabCase('JSONData')).toBe('json-data');
      expect(stringCase.kebabCase('XMLHttpRequest')).toBe('xml-http-request');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(stringCase.kebabCase('foo  bar')).toBe('foo-bar');
      expect(stringCase.kebabCase('foo-bar.baz')).toBe('foo-bar-baz');
      expect(stringCase.kebabCase('a-AA')).toBe('a-aa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(stringCase.kebabCase('')).toBe('');
    });
  });
});
