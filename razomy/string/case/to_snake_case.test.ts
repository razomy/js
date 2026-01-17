import {to_snake_case} from 'razomy.string/case';

describe('string', () => {
  describe('snake_case_string', () => {

    // 1. Standard casing styles
    it('converts camelCase', () => {
      expect(to_snake_case('camelCase')).toBe('camel_case');
    });

    it('converts PascalCase', () => {
      expect(to_snake_case('PascalCase')).toBe('pascal_case');
    });

    it('converts kebab-case', () => {
      expect(to_snake_case('kebab-case')).toBe('kebab_case');
    });

    it('keeps snake_case', () => {
      expect(to_snake_case('snake_case')).toBe('snake_case');
    });

    it('converts sentence casing', () => {
      expect(to_snake_case('Foo Bar')).toBe('foo_bar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(to_snake_case('foo.bar|baz')).toBe('foo_bar_baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(to_snake_case('__foo_bar__')).toBe('foo_bar');
      expect(to_snake_case('-foo-bar-')).toBe('foo_bar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(to_snake_case('a-AA')).toBe('a_aa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(to_snake_case('JSONData')).toBe('json_data');
    });

    it('handles acronyms in middle', () => {
      expect(to_snake_case('serverHTTPResponse')).toBe('server_http_response');
    });

    it('handles acronyms at end', () => {
      expect(to_snake_case('parseXML')).toBe('parse_xml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      expect(to_snake_case('version2beta')).toBe('version_2_beta');
      expect(to_snake_case('h2o')).toBe('h_2_o');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(to_snake_case('version-10-beta')).toBe('version_10_beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(to_snake_case('')).toBe('');
    });

    it('handles single characters', () => {
      expect(to_snake_case('A')).toBe('a');
    });
// 1. Data Preservation (The fix for your concern)
    it('preserves special characters (non-destructive)', () => {
      expect(to_snake_case('C#Project')).toBe('c#project');
      expect(to_snake_case('user@email.com')).toBe('user@email_com');
      expect(to_snake_case('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling (The fix for "version2beta")
    it('splits numbers adjacent to letters', () => {
      expect(to_snake_case('version2beta')).toBe('version_2_beta');
      expect(to_snake_case('foo123bar')).toBe('foo_123_bar');
      expect(to_snake_case('404error')).toBe('404_error');
    });

    // 3. Standard Cases
    it('handles standard camel and pascal case', () => {
      expect(to_snake_case('camelCase')).toBe('camel_case');
      expect(to_snake_case('PascalCase')).toBe('pascal_case');
    });

    it('handles acronyms intelligently', () => {
      expect(to_snake_case('JSONData')).toBe('json_data');
      expect(to_snake_case('XMLHttpRequest')).toBe('xml_http_request');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(to_snake_case('foo  bar')).toBe('foo_bar');
      expect(to_snake_case('foo-bar.baz')).toBe('foo_bar_baz');
      expect(to_snake_case('a-AA')).toBe('a_aa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(to_snake_case('')).toBe('');
    });
  });
});