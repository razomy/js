import { takeAfter } from './take_after';

describe('string', () => {
  describe('takeAfter', () => {
    // 1. Standard cases
    it('returns the substring after the first occurrence of the separator', () => {
      expect(takeAfter('foo.bar', '.')).toBe('bar');
    });

    it('returns the substring after a multi-character separator', () => {
      expect(takeAfter('foo.bar.baz', '.bar.')).toBe('baz');
    });

    // 2. Separator not found
    it('returns the original string if the separator is not found', () => {
      expect(takeAfter('foo', ',')).toBe('foo');
    });

    it('returns the original string if the separator is not present at all', () => {
      expect(takeAfter('hello world', 'xyz')).toBe('hello world');
    });

    // 3. First occurrence behavior
    it('returns the substring after the first occurrence when separator appears multiple times', () => {
      expect(takeAfter('a.b.c.d', '.')).toBe('b.c.d');
    });

    // 4. Empty string cases
    it('returns an empty string when text is empty and separator is not found', () => {
      expect(takeAfter('', 'a')).toBe('');
    });

    it('returns the full string when separator is empty (matches at index 0)', () => {
      expect(takeAfter('hello', '')).toBe('hello');
    });

    it('returns an empty string when both text and separator are empty', () => {
      expect(takeAfter('', '')).toBe('');
    });

    // 5. Separator at the start
    it('returns the substring after the separator when it is at the start', () => {
      expect(takeAfter('.foo', '.')).toBe('foo');
    });

    // 6. Separator at the end
    it('returns an empty string when the separator is at the end', () => {
      expect(takeAfter('foo.', '.')).toBe('');
    });

    // 7. Separator equals the text
    it('returns an empty string when the separator equals the entire text', () => {
      expect(takeAfter('hello', 'hello')).toBe('');
    });

    // 8. Separator longer than the text
    it('returns the original string when the separator is longer than the text', () => {
      expect(takeAfter('hi', 'hello')).toBe('hi');
    });

    // 9. Whitespace handling
    it('handles separators with whitespace', () => {
      expect(takeAfter('hello world foo', ' ')).toBe('world foo');
    });

    // 10. Special characters
    it('handles special characters in the separator', () => {
      expect(takeAfter('path/to/file', '/')).toBe('to/file');
      expect(takeAfter('key=value=other', '=')).toBe('value=other');
    });
  });
});
