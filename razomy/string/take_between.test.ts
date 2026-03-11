import { takeBetween } from './take_between';

describe('string', () => {
  describe('takeBetween', () => {
    // 1. Standard cases
    it('extracts a substring between two different delimiters', () => {
      expect(takeBetween('The quick brown fox', 'quick ', ' fox')).toBe('brown');
    });

    it('extracts a substring between matching delimiters', () => {
      expect(takeBetween('key="value";', '"', '"')).toBe('value');
    });

    it('extracts content between HTML-like tags', () => {
      expect(takeBetween('<div>content</div>', '<div>', '</div>')).toBe('content');
    });

    // 2. Edge cases with empty results
    it('returns an empty string when start and end are adjacent', () => {
      expect(takeBetween('hello[]world', '[', ']')).toBe('');
    });

    it('returns an empty string when delimiters are immediately next to each other', () => {
      expect(takeBetween('startend', 'start', 'end')).toBe('');
    });

    // 3. Multiple occurrences - should match first start and first end after start
    it('extracts using the first occurrence of start and first end after it', () => {
      expect(takeBetween('a|b|c|d', '|', '|')).toBe('b');
    });

    it('uses the first occurrence of start when multiple exist', () => {
      expect(takeBetween('[first][second]', '[', ']')).toBe('first');
    });

    // 4. Error cases
    it('throws an error when start delimiter is not found', () => {
      expect(() => takeBetween('hello world', 'xyz', 'world')).toThrow(
        "Start substring 'xyz' not found in the source text.",
      );
    });

    it('throws an error when end delimiter is not found after start', () => {
      expect(() => takeBetween('hello world', 'hello', 'xyz')).toThrow(
        "End substring 'xyz' not found after the start substring.",
      );
    });

    it('throws an error when both delimiters are not found', () => {
      expect(() => takeBetween('hello', 'abc', 'def')).toThrow("Start substring 'abc' not found in the source text.");
    });

    // 5. End delimiter exists before start but not after
    it('throws if end delimiter only appears before start delimiter', () => {
      expect(() => takeBetween('end...start', 'start', 'end')).toThrow(
        "End substring 'end' not found after the start substring.",
      );
    });

    // 6. Delimiters with special characters
    it('works with multi-character delimiters', () => {
      expect(takeBetween('BEGIN>>>data<<<END', '>>>', '<<<')).toBe('data');
    });

    it('works with delimiters containing spaces', () => {
      expect(takeBetween('start here middle end here', 'start here ', ' end here')).toBe('middle');
    });

    // 7. Extracted content with various characters
    it('extracts content that includes spaces and special characters', () => {
      expect(takeBetween('(hello world! @#$)', '(', ')')).toBe('hello world! @#$');
    });

    it('extracts content that includes newlines', () => {
      expect(takeBetween('<p>\nline1\nline2\n</p>', '<p>', '</p>')).toBe('\nline1\nline2\n');
    });

    // 8. Empty start or end delimiters
    it('handles empty start delimiter by extracting from the beginning', () => {
      expect(takeBetween('hello world', '', ' ')).toBe('hello');
    });

    it('handles empty end delimiter by extracting up to the position right after start', () => {
      expect(takeBetween('hello world', 'hello', '')).toBe('');
    });

    // 9. Single character text and delimiters
    it('works with single character delimiters and content', () => {
      expect(takeBetween('aba', 'a', 'a')).toBe('b');
    });
  });
});
