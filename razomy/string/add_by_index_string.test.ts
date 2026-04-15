import * as string from "@razomy/string";

describe('string', () => {
  describe('addByIndexString', () => {
    // 1. Standard cases from examples
    it('inserts at the beginning of a string (index 0)', () => {
      expect(string.addByIndexString('-text', 0, 'prefix')).toBe('prefix-text');
    });

    it('inserts at the end of a string', () => {
      expect(string.addByIndexString('hello ', 6, 'world')).toBe('hello world');
    });

    it('inserts in the middle of a string', () => {
      expect(string.addByIndexString('foo baz', 4, 'bar ')).toBe('foo bar baz');
    });

    // 2. Edge cases with empty strings
    it('inserts into an empty string at index 0', () => {
      expect(string.addByIndexString('', 0, 'hello')).toBe('hello');
    });

    it('inserts an empty string (no change)', () => {
      expect(string.addByIndexString('hello', 3, '')).toBe('hello');
    });

    it('inserts an empty string into an empty string', () => {
      expect(string.addByIndexString('', 0, '')).toBe('');
    });

    // 3. Insertion at various positions
    it('inserts at index 1', () => {
      expect(string.addByIndexString('ac', 1, 'b')).toBe('abc');
    });

    it('inserts at the last character position', () => {
      expect(string.addByIndexString('ab', 2, 'c')).toBe('abc');
    });

    // 4. Insertion with special characters
    it('handles insertion of special characters', () => {
      expect(string.addByIndexString('hello world', 5, ',\n')).toBe('hello,\n world');
    });

    it('handles unicode characters', () => {
      expect(string.addByIndexString('hllo', 1, 'é')).toBe('héllo');
    });

    // 5. Insertion with longer strings
    it('inserts a longer string into a shorter one', () => {
      expect(string.addByIndexString('ab', 1, '12345')).toBe('a12345b');
    });

    // 6. Single character original string
    it('inserts before a single character', () => {
      expect(string.addByIndexString('b', 0, 'a')).toBe('ab');
    });

    it('inserts after a single character', () => {
      expect(string.addByIndexString('a', 1, 'b')).toBe('ab');
    });

    // 7. Whitespace handling
    it('inserts whitespace correctly', () => {
      expect(string.addByIndexString('helloworld', 5, ' ')).toBe('hello world');
    });

    // 8. Multi-word insertion
    it('inserts multiple words at once', () => {
      expect(string.addByIndexString('The fox.', 4, 'quick brown ')).toBe('The quick brown fox.');
    });
  });
});
