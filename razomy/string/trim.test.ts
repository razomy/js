import { trim } from './trim';

describe('string', () => {
  describe('trim', () => {
    // 1. Standard cases
    it('removes whitespace from both ends of the string', () => {
      expect(trim('  foo  ')).toBe('foo');
    });

    it('removes leading whitespace only', () => {
      expect(trim('  foo')).toBe('foo');
    });

    it('removes trailing whitespace only', () => {
      expect(trim('foo  ')).toBe('foo');
    });

    // 2. Special whitespace characters
    it('removes newline and tab characters', () => {
      expect(trim('\nbar\t')).toBe('bar');
    });

    it('removes a mix of various whitespace characters', () => {
      expect(trim('\t\n\r  hello world  \r\n\t')).toBe('hello world');
    });

    it('removes carriage return characters', () => {
      expect(trim('\r\nhello\r\n')).toBe('hello');
    });

    // 3. All whitespace strings
    it('returns an empty string when input is only spaces', () => {
      expect(trim('   ')).toBe('');
    });

    it('returns an empty string when input is only tabs and newlines', () => {
      expect(trim('\t\n\r')).toBe('');
    });

    // 4. Empty string
    it('returns an empty string when input is empty', () => {
      expect(trim('')).toBe('');
    });

    // 5. No trimming needed
    it('returns the same string when there is no surrounding whitespace', () => {
      expect(trim('foo')).toBe('foo');
    });

    // 6. Interior whitespace preserved
    it('does not remove whitespace from the interior of the string', () => {
      expect(trim('  foo bar baz  ')).toBe('foo bar baz');
    });

    it('preserves interior tabs and newlines', () => {
      expect(trim('  foo\tbar\nbaz  ')).toBe('foo\tbar\nbaz');
    });

    // 7. Single character strings
    it('handles a single non-whitespace character', () => {
      expect(trim('a')).toBe('a');
    });

    it('handles a single whitespace character', () => {
      expect(trim(' ')).toBe('');
    });

    // 8. Special characters
    it('works correctly with special characters', () => {
      expect(trim('  !@#$%^&*()  ')).toBe('!@#$%^&*()');
    });

    it('works correctly with unicode characters', () => {
      expect(trim('  こんにちは  ')).toBe('こんにちは');
    });
  });
});