import * as string from '@razomy/string';

describe('array', () => {
  describe('join', () => {
    // 1. Standard cases
    it('joins an array of strings with a hyphen separator', () => {
      expect(string.join(['a', 'b', 'c'], '-')).toBe('a-b-c');
    });

    it('joins an array of strings with a space separator', () => {
      expect(string.join(['hello', 'world'], ' ')).toBe('hello world');
    });

    it('joins an array of strings with a comma separator', () => {
      expect(string.join(['one', 'two', 'three'], ',')).toBe('one,two,three');
    });

    // 2. Single element array
    it('returns the single element when the array has one item', () => {
      expect(string.join(['one'], ',')).toBe('one');
    });

    it('returns the single element regardless of separator', () => {
      expect(string.join(['hello'], '---')).toBe('hello');
    });

    // 3. Empty array
    it('returns an empty string for an empty array', () => {
      expect(string.join([], '-')).toBe('');
    });

    it('returns an empty string for an empty array regardless of separator', () => {
      expect(string.join([], '!!!')).toBe('');
    });

    // 4. Empty string separator
    it('joins elements with no separator when separator is an empty string', () => {
      expect(string.join(['a', 'b', 'c'], '')).toBe('abc');
    });

    // 5. Multi-character separator
    it('joins elements with a multi-character separator', () => {
      expect(string.join(['a', 'b', 'c'], ' -> ')).toBe('a -> b -> c');
    });

    // 6. Empty strings in the array
    it('handles empty strings within the array', () => {
      expect(string.join(['', '', ''], '-')).toBe('--');
    });

    it('handles a mix of empty and non-empty strings', () => {
      expect(string.join(['a', '', 'c'], '-')).toBe('a--c');
    });

    // 7. Two element array
    it('joins two elements correctly', () => {
      expect(string.join(['foo', 'bar'], ', ')).toBe('foo, bar');
    });

    // 8. Separator that appears in the items
    it('works when separator characters appear within the items', () => {
      expect(string.join(['a-b', 'c-d'], '-')).toBe('a-b-c-d');
    });

    // 9. Special characters as separator
    it('works with special characters as separator', () => {
      expect(string.join(['x', 'y', 'z'], '\n')).toBe('x\ny\nz');
    });

    it('works with tab character as separator', () => {
      expect(string.join(['col1', 'col2', 'col3'], '\t')).toBe('col1\tcol2\tcol3');
    });
  });
});
