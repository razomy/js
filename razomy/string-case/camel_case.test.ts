import * as stringCase from '@razomy/string-case';

describe('string', () => {
  describe('camel_case', () => {
    // 1. Standard casing styles
    it('keeps camelCase', () => {
      expect(stringCase.camelCase('camelCase')).toBe('camelCase');
    });

    it('converts PascalCase', () => {
      expect(stringCase.camelCase('PascalCase')).toBe('pascalCase');
    });

    it('converts kebab-case', () => {
      expect(stringCase.camelCase('kebab-case')).toBe('kebabCase');
    });

    it('converts snake_case', () => {
      expect(stringCase.camelCase('snake_case')).toBe('snakeCase');
    });

    it('converts sentence casing', () => {
      expect(stringCase.camelCase('Foo Bar')).toBe('fooBar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(stringCase.camelCase('foo.bar|baz')).toBe('fooBarBaz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(stringCase.camelCase('__foo_bar__')).toBe('fooBar');
      expect(stringCase.camelCase('-foo-bar-')).toBe('fooBar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(stringCase.camelCase('a-AA')).toBe('aAa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(stringCase.camelCase('JSONData')).toBe('jsonData');
    });

    it('handles acronyms in middle', () => {
      expect(stringCase.camelCase('serverHTTPResponse')).toBe('serverHttpResponse');
    });

    it('handles acronyms at end', () => {
      expect(stringCase.camelCase('parseXML')).toBe('parseXml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      // 'version_2_beta' -> 'version2Beta'
      expect(stringCase.camelCase('version2beta')).toBe('version2Beta');
      // 'h_2_o' -> 'h2O'
      expect(stringCase.camelCase('h2o')).toBe('h2O');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(stringCase.camelCase('version-10-beta')).toBe('version10Beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(stringCase.camelCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(stringCase.camelCase('A')).toBe('a');
    });

    // 1. Data Preservation
    it('preserves special characters (non-destructive)', () => {
      expect(stringCase.camelCase('C#Project')).toBe('c#project');
      expect(stringCase.camelCase('user@email.com')).toBe('user@emailCom');
      expect(stringCase.camelCase('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling
    it('splits numbers adjacent to letters', () => {
      expect(stringCase.camelCase('version2beta')).toBe('version2Beta');
      expect(stringCase.camelCase('foo123bar')).toBe('foo123Bar');
      expect(stringCase.camelCase('404error')).toBe('404Error');
    });

    // 3. Standard Cases
    it('handles standard snake and pascal case', () => {
      expect(stringCase.camelCase('snake_case')).toBe('snakeCase');
      expect(stringCase.camelCase('PascalCase')).toBe('pascalCase');
    });

    it('handles acronyms intelligently', () => {
      expect(stringCase.camelCase('JSONData')).toBe('jsonData');
      expect(stringCase.camelCase('XMLHttpRequest')).toBe('xmlHttpRequest');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(stringCase.camelCase('foo  bar')).toBe('fooBar');
      expect(stringCase.camelCase('foo-bar.baz')).toBe('fooBarBaz');
      expect(stringCase.camelCase('a-AA')).toBe('aAa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(stringCase.camelCase('')).toBe('');
    });
  });
});
