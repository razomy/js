import {to_camel_case} from 'razomy.string/case';

describe('string', () => {
  describe('camel_case_string', () => {

    // 1. Standard casing styles
    it('keeps camelCase', () => {
      expect(to_camel_case('camelCase')).toBe('camelCase');
    });

    it('converts PascalCase', () => {
      expect(to_camel_case('PascalCase')).toBe('pascalCase');
    });

    it('converts kebab-case', () => {
      expect(to_camel_case('kebab-case')).toBe('kebabCase');
    });

    it('converts snake_case', () => {
      expect(to_camel_case('snake_case')).toBe('snakeCase');
    });

    it('converts sentence casing', () => {
      expect(to_camel_case('Foo Bar')).toBe('fooBar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(to_camel_case('foo.bar|baz')).toBe('fooBarBaz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(to_camel_case('__foo_bar__')).toBe('fooBar');
      expect(to_camel_case('-foo-bar-')).toBe('fooBar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(to_camel_case('a-AA')).toBe('aAa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(to_camel_case('JSONData')).toBe('jsonData');
    });

    it('handles acronyms in middle', () => {
      expect(to_camel_case('serverHTTPResponse')).toBe('serverHttpResponse');
    });

    it('handles acronyms at end', () => {
      expect(to_camel_case('parseXML')).toBe('parseXml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      // 'version_2_beta' -> 'version2Beta'
      expect(to_camel_case('version2beta')).toBe('version2Beta');
      // 'h_2_o' -> 'h2O'
      expect(to_camel_case('h2o')).toBe('h2O');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(to_camel_case('version-10-beta')).toBe('version10Beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(to_camel_case('')).toBe('');
    });

    it('handles single characters', () => {
      expect(to_camel_case('A')).toBe('a');
    });

    // 1. Data Preservation
    it('preserves special characters (non-destructive)', () => {
      expect(to_camel_case('C#Project')).toBe('c#project');
      expect(to_camel_case('user@email.com')).toBe('user@emailCom');
      expect(to_camel_case('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling
    it('splits numbers adjacent to letters', () => {
      expect(to_camel_case('version2beta')).toBe('version2Beta');
      expect(to_camel_case('foo123bar')).toBe('foo123Bar');
      expect(to_camel_case('404error')).toBe('404Error');
    });

    // 3. Standard Cases
    it('handles standard snake and pascal case', () => {
      expect(to_camel_case('snake_case')).toBe('snakeCase');
      expect(to_camel_case('PascalCase')).toBe('pascalCase');
    });

    it('handles acronyms intelligently', () => {
      expect(to_camel_case('JSONData')).toBe('jsonData');
      expect(to_camel_case('XMLHttpRequest')).toBe('xmlHttpRequest');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(to_camel_case('foo  bar')).toBe('fooBar');
      expect(to_camel_case('foo-bar.baz')).toBe('fooBarBaz');
      expect(to_camel_case('a-AA')).toBe('aAa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(to_camel_case('')).toBe('');
    });
  });
});