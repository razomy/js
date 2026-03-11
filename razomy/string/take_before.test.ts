import { takeBefore } from './take_before';

describe('string', () => {
  describe('takeBefore', () => {
    // 1. Standard cases
    it('returns the substring before the first occurrence of the separator', () => {
      expect(takeBefore('user@example.com', '@')).toBe('user');
    });

    it('returns the substring before a dot separator', () => {
      expect(takeBefore('@razomy/string', '/')).toBe('@razomy');
    });

    it('returns the substring before the first occurrence when separator appears multiple times', () => {
      expect(takeBefore('a.b.c.d', '.')).toBe('a');
    });

    // 2. Separator not found
    it('returns the original string if the separator is not found', () => {
      expect(takeBefore('atomic', ' ')).toBe('atomic');
    });

    it('returns the original string when separator is completely absent', () => {
      expect(takeBefore('hello', '@')).toBe('hello');
    });

    // 3. Separator at the beginning
    it('returns an empty string if the separator is at the start', () => {
      expect(takeBefore('@example.com', '@')).toBe('');
    });

    // 4. Separator at the end
    it('returns everything before the separator when it is at the end', () => {
      expect(takeBefore('hello@', '@')).toBe('hello');
    });

    // 5. Empty string inputs
    it('returns an empty string when both text and separator are empty', () => {
      expect(takeBefore('', '')).toBe('');
    });

    it('returns an empty string when text is empty and separator is non-empty', () => {
      expect(takeBefore('', '@')).toBe('');
    });

    it('returns an empty string when text is non-empty and separator is empty', () => {
      expect(takeBefore('hello', '')).toBe('');
    });

    // 6. Multi-character separator
    it('works with a multi-character separator', () => {
      expect(takeBefore('hello::world::foo', '::')).toBe('hello');
    });

    it('returns the original string if multi-character separator is not found', () => {
      expect(takeBefore('hello-world', '::')).toBe('hello-world');
    });

    // 7. Separator is the entire string
    it('returns an empty string when the separator is the entire string', () => {
      expect(takeBefore('hello', 'hello')).toBe('');
    });

    // 8. Special characters
    it('handles special characters in the separator', () => {
      expect(takeBefore('path/to/file', '/')).toBe('path');
    });

    it('handles newline as separator', () => {
      expect(takeBefore('line1\nline2\nline3', '\n')).toBe('line1');
    });

    // 9. Single character string
    it('works with a single character string when separator matches', () => {
      expect(takeBefore('.', '.')).toBe('');
    });

    it('works with a single character string when separator does not match', () => {
      expect(takeBefore('a', '.')).toBe('a');
    });
  });
});