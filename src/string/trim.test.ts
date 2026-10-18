import * as string from '@razomy/string';

describe('string', () => {
  describe('trim', () => {
    // 1. Standard cases
    it('removes whitespace from both ends of the string', () => {
      expect(string.trim('  foo  ')).toBe('foo');
    });

    it('removes leading whitespace only', () => {
      expect(string.trim('  foo')).toBe('foo');
    });

    it('removes trailing whitespace only', () => {
      expect(string.trim('foo  ')).toBe('foo');
    });

    // 2. Special whitespace characters
    it('removes newline and tab characters', () => {
      expect(string.trim('\nbar\t')).toBe('bar');
    });

    it('removes a mix of various whitespace characters', () => {
      expect(string.trim('\t\n\r  hello world  \r\n\t')).toBe('hello world');
    });

    it('removes carriage return characters', () => {
      expect(string.trim('\r\nhello\r\n')).toBe('hello');
    });

    // 3. All whitespace strings
    it('returns an empty string when input is only spaces', () => {
      expect(string.trim('   ')).toBe('');
    });

    it('returns an empty string when input is only tabs and newlines', () => {
      expect(string.trim('\t\n\r')).toBe('');
    });

    // 4. Empty string
    it('returns an empty string when input is empty', () => {
      expect(string.trim('')).toBe('');
    });

    // 5. No trimming needed
    it('returns the same string when there is no surrounding whitespace', () => {
      expect(string.trim('foo')).toBe('foo');
    });

    // 6. Interior whitespace preserved
    it('does not remove whitespace from the interior of the string', () => {
      expect(string.trim('  foo bar baz  ')).toBe('foo bar baz');
    });

    it('preserves interior tabs and newlines', () => {
      expect(string.trim('  foo\tbar\nbaz  ')).toBe('foo\tbar\nbaz');
    });

    // 7. Single character strings
    it('handles a single non-whitespace character', () => {
      expect(string.trim('a')).toBe('a');
    });

    it('handles a single whitespace character', () => {
      expect(string.trim(' ')).toBe('');
    });

    // 8. Special characters
    it('works correctly with special characters', () => {
      expect(string.trim('  !@#$%^&*()  ')).toBe('!@#$%^&*()');
    });

    it('works correctly with unicode characters', () => {
      expect(string.trim('  こんにちは  ')).toBe('こんにちは');
    });
  });
});
