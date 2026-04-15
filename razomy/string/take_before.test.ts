import * as string from '@razomy/string';

describe('string', () => {
  describe('takeBefore', () => {
    // 1. Standard cases
    it('returns the substring before the first occurrence of the separator', () => {
      expect(string.takeBefore('user@example.com', '@')).toBe('user');
    });

    it('returns the substring before a dot separator', () => {
      expect(string.takeBefore('@razomy/string', '/')).toBe('@razomy');
    });

    it('returns the substring before the first occurrence when separator appears multiple times', () => {
      expect(string.takeBefore('a.b.c.d', '.')).toBe('a');
    });

    // 2. Separator not found
    it('returns the original string if the separator is not found', () => {
      expect(string.takeBefore('atomic', ' ')).toBe('atomic');
    });

    it('returns the original string when separator is completely absent', () => {
      expect(string.takeBefore('hello', '@')).toBe('hello');
    });

    // 3. Separator at the beginning
    it('returns an empty string if the separator is at the start', () => {
      expect(string.takeBefore('@example.com', '@')).toBe('');
    });

    // 4. Separator at the end
    it('returns everything before the separator when it is at the end', () => {
      expect(string.takeBefore('hello@', '@')).toBe('hello');
    });

    // 5. Empty string inputs
    it('returns an empty string when both text and separator are empty', () => {
      expect(string.takeBefore('', '')).toBe('');
    });

    it('returns an empty string when text is empty and separator is non-empty', () => {
      expect(string.takeBefore('', '@')).toBe('');
    });

    it('returns an empty string when text is non-empty and separator is empty', () => {
      expect(string.takeBefore('hello', '')).toBe('');
    });

    // 6. Multi-character separator
    it('works with a multi-character separator', () => {
      expect(string.takeBefore('hello::world::foo', '::')).toBe('hello');
    });

    it('returns the original string if multi-character separator is not found', () => {
      expect(string.takeBefore('hello-world', '::')).toBe('hello-world');
    });

    // 7. Separator is the entire string
    it('returns an empty string when the separator is the entire string', () => {
      expect(string.takeBefore('hello', 'hello')).toBe('');
    });

    // 8. Special characters
    it('handles special characters in the separator', () => {
      expect(string.takeBefore('path/to/file', '/')).toBe('path');
    });

    it('handles newline as separator', () => {
      expect(string.takeBefore('line1\nline2\nline3', '\n')).toBe('line1');
    });

    // 9. Single character string
    it('works with a single character string when separator matches', () => {
      expect(string.takeBefore('.', '.')).toBe('');
    });

    it('works with a single character string when separator does not match', () => {
      expect(string.takeBefore('a', '.')).toBe('a');
    });
  });
});
