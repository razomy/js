import { prefixLines } from './prefix_lines';

describe('string', () => {
  describe('prefixLines', () => {
    // 1. Standard cases
    it('adds margin to a single line string', () => {
      expect(prefixLines('Hello', '  ')).toBe('  Hello');
    });

    it('adds margin to every line of a multi-line string', () => {
      expect(prefixLines('Line 1\nLine 2', '> ')).toBe('> Line 1\n> Line 2');
    });

    it('adds tab margin to a single line', () => {
      expect(prefixLines('Code', '\t')).toBe('\tCode');
    });

    // 2. Multiple lines
    it('adds margin to three or more lines', () => {
      expect(prefixLines('a\nb\nc', '- ')).toBe('- a\n- b\n- c');
    });

    // 3. Empty string cases
    it('adds margin to an empty string', () => {
      expect(prefixLines('', '  ')).toBe('  ');
    });

    it('adds empty margin to a string (no change)', () => {
      expect(prefixLines('Hello', '')).toBe('Hello');
    });

    it('adds empty margin to a multi-line string (no change)', () => {
      expect(prefixLines('Line 1\nLine 2', '')).toBe('Line 1\nLine 2');
    });

    // 4. Empty lines within text
    it('adds margin to empty lines in between content lines', () => {
      expect(prefixLines('a\n\nb', '| ')).toBe('| a\n| \n| b');
    });

    it('adds margin to a string that is only newlines', () => {
      expect(prefixLines('\n\n', '> ')).toBe('> \n> \n> ');
    });

    // 5. Various margin characters
    it('works with numeric string margin', () => {
      expect(prefixLines('test', '123')).toBe('123test');
    });

    it('works with multi-character margin on multiple lines', () => {
      expect(prefixLines('foo\nbar\nbaz', '---')).toBe('---foo\n---bar\n---baz');
    });

    // 6. Special characters in text
    it('handles lines with special characters', () => {
      expect(prefixLines('hello\tworld\nfoo\tbar', '  ')).toBe('  hello\tworld\n  foo\tbar');
    });

    // 7. Trailing newline
    it('handles text with a trailing newline', () => {
      expect(prefixLines('hello\n', '> ')).toBe('> hello\n> ');
    });

    // 8. Leading newline
    it('handles text with a leading newline', () => {
      expect(prefixLines('\nhello', '> ')).toBe('> \n> hello');
    });
  });
});