import {toCamelCase} from 'razomy.string.case';

describe('string', () => {
  describe('camel_case_string', () => {

    // 1. Standard casing styles
    it('keeps camelCase', () => {
      expect(toCamelCase('camelCase')).toBe('camelCase');
    });

    it('converts PascalCase', () => {
      expect(toCamelCase('PascalCase')).toBe('pascalCase');
    });

    it('converts kebab-case', () => {
      expect(toCamelCase('kebab-case')).toBe('kebabCase');
    });

    it('converts snake_case', () => {
      expect(toCamelCase('snake_case')).toBe('snakeCase');
    });

    it('converts sentence casing', () => {
      expect(toCamelCase('Foo Bar')).toBe('fooBar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(toCamelCase('foo.bar|baz')).toBe('fooBarBaz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(toCamelCase('__foo_bar__')).toBe('fooBar');
      expect(toCamelCase('-foo-bar-')).toBe('fooBar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(toCamelCase('a-AA')).toBe('aAa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(toCamelCase('JSONData')).toBe('jsonData');
    });

    it('handles acronyms in middle', () => {
      expect(toCamelCase('serverHTTPResponse')).toBe('serverHttpResponse');
    });

    it('handles acronyms at end', () => {
      expect(toCamelCase('parseXML')).toBe('parseXml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      // 'version_2_beta' -> 'version2Beta'
      expect(toCamelCase('version2beta')).toBe('version2Beta');
      // 'h_2_o' -> 'h2O'
      expect(toCamelCase('h2o')).toBe('h2O');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(toCamelCase('version-10-beta')).toBe('version10Beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(toCamelCase('')).toBe('');
    });

    it('handles single characters', () => {
      expect(toCamelCase('A')).toBe('a');
    });

    // 1. Data Preservation
    it('preserves special characters (non-destructive)', () => {
      expect(toCamelCase('C#Project')).toBe('c#project');
      expect(toCamelCase('user@email.com')).toBe('user@emailCom');
      expect(toCamelCase('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling
    it('splits numbers adjacent to letters', () => {
      expect(toCamelCase('version2beta')).toBe('version2Beta');
      expect(toCamelCase('foo123bar')).toBe('foo123Bar');
      expect(toCamelCase('404error')).toBe('404Error');
    });

    // 3. Standard Cases
    it('handles standard snake and pascal case', () => {
      expect(toCamelCase('snake_case')).toBe('snakeCase');
      expect(toCamelCase('PascalCase')).toBe('pascalCase');
    });

    it('handles acronyms intelligently', () => {
      expect(toCamelCase('JSONData')).toBe('jsonData');
      expect(toCamelCase('XMLHttpRequest')).toBe('xmlHttpRequest');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(toCamelCase('foo  bar')).toBe('fooBar');
      expect(toCamelCase('foo-bar.baz')).toBe('fooBarBaz');
      expect(toCamelCase('a-AA')).toBe('aAa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(toCamelCase('')).toBe('');
    });
  });
});