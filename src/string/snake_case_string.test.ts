import snake_case_string from 'razomy.string/snake_case_string';

describe('string', () => {
  describe('snake_case_string', () => {

    // 1. Standard casing styles
    it('converts camelCase', () => {
      expect(snake_case_string('camelCase')).toBe('camel_case');
    });

    it('converts PascalCase', () => {
      expect(snake_case_string('PascalCase')).toBe('pascal_case');
    });

    it('converts kebab-case', () => {
      expect(snake_case_string('kebab-case')).toBe('kebab_case');
    });

    it('keeps snake_case', () => {
      expect(snake_case_string('snake_case')).toBe('snake_case');
    });

    it('converts sentence casing', () => {
      expect(snake_case_string('Foo Bar')).toBe('foo_bar');
    });

    // 2. Handling Delimiters
    it('handles mixed delimiters (dots, pipes, etc)', () => {
      expect(snake_case_string('foo.bar|baz')).toBe('foo_bar_baz');
    });

    it('trims leading/trailing delimiters', () => {
      expect(snake_case_string('__foo_bar__')).toBe('foo_bar');
      expect(snake_case_string('-foo-bar-')).toBe('foo_bar');
    });

    it('handles user specific case (hyphen + caps)', () => {
      expect(snake_case_string('a-AA')).toBe('a_aa');
    });

    // 3. Acronyms (Consecutive Capitals)
    it('handles acronyms at start', () => {
      expect(snake_case_string('JSONData')).toBe('json_data');
    });

    it('handles acronyms in middle', () => {
      expect(snake_case_string('serverHTTPResponse')).toBe('server_http_response');
    });

    it('handles acronyms at end', () => {
      expect(snake_case_string('parseXML')).toBe('parse_xml');
    });

    // 4. Numbers
    it('separates numbers adjacent to letters', () => {
      expect(snake_case_string('version2beta')).toBe('version_2_beta');
      expect(snake_case_string('h2o')).toBe('h_2_o');
    });

    it('handles numbers correctly in kebab/snake case', () => {
      expect(snake_case_string('version-10-beta')).toBe('version_10_beta');
    });

    // 5. Edge cases
    it('returns empty string for empty input', () => {
      expect(snake_case_string('')).toBe('');
    });

    it('handles single characters', () => {
      expect(snake_case_string('A')).toBe('a');
    });
// 1. Data Preservation (The fix for your concern)
    it('preserves special characters (non-destructive)', () => {
      expect(snake_case_string('C#Project')).toBe('c#project');
      expect(snake_case_string('user@email.com')).toBe('user@email_com');
      expect(snake_case_string('$$money$$')).toBe('$$money$$');
    });

    // 2. Number Handling (The fix for "version2beta")
    it('splits numbers adjacent to letters', () => {
      expect(snake_case_string('version2beta')).toBe('version_2_beta');
      expect(snake_case_string('foo123bar')).toBe('foo_123_bar');
      expect(snake_case_string('404error')).toBe('404_error');
    });

    // 3. Standard Cases
    it('handles standard camel and pascal case', () => {
      expect(snake_case_string('camelCase')).toBe('camel_case');
      expect(snake_case_string('PascalCase')).toBe('pascal_case');
    });

    it('handles acronyms intelligently', () => {
      expect(snake_case_string('JSONData')).toBe('json_data');
      expect(snake_case_string('XMLHttpRequest')).toBe('xml_http_request');
    });

    // 4. Delimiters
    it('collapses mixed delimiters', () => {
      expect(snake_case_string('foo  bar')).toBe('foo_bar');
      expect(snake_case_string('foo-bar.baz')).toBe('foo_bar_baz');
      expect(snake_case_string('a-AA')).toBe('a_aa');
    });

    // 5. Empty
    it('returns empty string for empty input', () => {
      expect(snake_case_string('')).toBe('');
    });
  });
});