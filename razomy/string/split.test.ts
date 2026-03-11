import { split } from './split';

describe('string', () => {
  describe('split', () => {
    // 1. Standard cases with string splitter
    it('splits a string by newline character', () => {
      expect(split('Line 1\nLine 2', '\n')).toEqual(['Line 1', 'Line 2']);
    });

    it('splits a string by comma', () => {
      expect(split('a,b,c', ',')).toEqual(['a', 'b', 'c']);
    });

    it('splits a string by space', () => {
      expect(split('hello world foo', ' ')).toEqual(['hello', 'world', 'foo']);
    });

    // 2. Standard cases with RegExp splitter
    it('splits a string by regex newline', () => {
      expect(split('A\nB\nC', /[\n]/)).toEqual(['A', 'B', 'C']);
    });

    it('splits a string by regex matching multiple delimiters', () => {
      expect(split('a,b;c.d', /[,;.]/)).toEqual(['a', 'b', 'c', 'd']);
    });

    it('splits a string by regex with whitespace pattern', () => {
      expect(split('one  two\tthree', /\s+/)).toEqual(['one', 'two', 'three']);
    });

    // 3. Empty string splitter (split into characters)
    it('splits into individual characters when splitter is empty string', () => {
      expect(split('One', '')).toEqual(['O', 'n', 'e']);
    });

    it('splits an empty string with empty splitter into an empty array', () => {
      expect(split('', '')).toEqual([]);
    });

    // 4. Empty string input
    it('returns an array with one empty string when splitting empty string by non-empty splitter', () => {
      expect(split('', '\n')).toEqual(['']);
    });

    it('returns an array with one empty string when splitting empty string by regex', () => {
      expect(split('', /,/)).toEqual(['']);
    });

    // 5. Splitter not found in text
    it('returns the entire string in an array if splitter is not found', () => {
      expect(split('hello', ',')).toEqual(['hello']);
    });

    it('returns the entire string in an array if regex splitter does not match', () => {
      expect(split('hello', /[0-9]/)).toEqual(['hello']);
    });

    // 6. Limit parameter
    it('limits the number of splits when limit is provided', () => {
      expect(split('a,b,c,d', ',', 2)).toEqual(['a', 'b']);
    });

    it('returns all parts if limit is greater than number of splits', () => {
      expect(split('a,b,c', ',', 10)).toEqual(['a', 'b', 'c']);
    });

    it('returns an empty array when limit is 0', () => {
      expect(split('a,b,c', ',', 0)).toEqual([]);
    });

    it('returns one element when limit is 1', () => {
      expect(split('a,b,c', ',', 1)).toEqual(['a']);
    });

    it('limits splits with regex splitter', () => {
      expect(split('A\nB\nC\nD', /\n/, 3)).toEqual(['A', 'B', 'C']);
    });

    it('limits character split with empty string splitter', () => {
      expect(split('hello', '', 3)).toEqual(['h', 'e', 'l']);
    });

    // 7. Consecutive splitters (empty strings in result)
    it('produces empty strings for consecutive delimiters', () => {
      expect(split('a,,b', ',')).toEqual(['a', '', 'b']);
    });

    it('produces empty strings at start and end when splitter is at boundaries', () => {
      expect(split(',a,b,', ',')).toEqual(['', 'a', 'b', '']);
    });

    // 8. Multi-character string splitter
    it('splits by a multi-character string splitter', () => {
      expect(split('hello--world--foo', '--')).toEqual(['hello', 'world', 'foo']);
    });

    // 9. Single character string
    it('splits a single character string by empty splitter', () => {
      expect(split('x', '')).toEqual(['x']);
    });

    it('splits a single character string by itself', () => {
      expect(split('x', 'x')).toEqual(['', '']);
    });

    // 10. Undefined limit behaves as no limit
    it('returns all splits when limit is undefined', () => {
      expect(split('a,b,c,d', ',', undefined)).toEqual(['a', 'b', 'c', 'd']);
    });
  });
});
