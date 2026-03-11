import { marginLeft } from './margin_left';

describe('string', () => {
  describe('marginLeft', () => {
    // 1. Standard cases
    it('adds margin to a single line string', () => {
      expect(marginLeft('Hello', '  ')).toBe('  Hello');
    });

    it('adds margin to every line of a multi-line string', () => {
      expect(marginLeft('Line 1\nLine 2', '> ')).toBe('> Line 1\n> Line 2');
    });

    it('adds tab margin to a single line', () => {
      expect(marginLeft('Code', '\t')).toBe('\tCode');
    });

    // 2. Multiple lines
    it('adds margin to three or more lines', () => {
      expect(marginLeft('a\nb\nc', '- ')).toBe('- a\n- b\n- c');
    });

    // 3. Empty string cases
    it('adds margin to an empty string', () => {
      expect(marginLeft('', '  ')).toBe('  ');
    });

    it('adds empty margin to a string (no change)', () => {
      expect(marginLeft('Hello', '')).toBe('Hello');
    });

    it('adds empty margin to a multi-line string (no change)', () => {
      expect(marginLeft('Line 1\nLine 2', '')).toBe('Line 1\nLine 2');
    });

    // 4. Empty lines within text
    it('adds margin to empty lines in between content lines', () => {
      expect(marginLeft('a\n\nb', '| ')).toBe('| a\n| \n| b');
    });

    it('adds margin to a string that is only newlines', () => {
      expect(marginLeft('\n\n', '> ')).toBe('> \n> \n> ');
    });

    // 5. Various margin characters
    it('works with numeric string margin', () => {
      expect(marginLeft('test', '123')).toBe('123test');
    });

    it('works with multi-character margin on multiple lines', () => {
      expect(marginLeft('foo\nbar\nbaz', '---')).toBe('---foo\n---bar\n---baz');
    });

    // 6. Special characters in text
    it('handles lines with special characters', () => {
      expect(marginLeft('hello\tworld\nfoo\tbar', '  ')).toBe('  hello\tworld\n  foo\tbar');
    });

    // 7. Trailing newline
    it('handles text with a trailing newline', () => {
      expect(marginLeft('hello\n', '> ')).toBe('> hello\n> ');
    });

    // 8. Leading newline
    it('handles text with a leading newline', () => {
      expect(marginLeft('\nhello', '> ')).toBe('> \n> hello');
    });
  });
});