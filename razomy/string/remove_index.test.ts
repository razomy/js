import { removeIndex } from './remove_index';

describe('string', () => {
  describe('removeIndex', () => {
    // 1. Standard cases
    it('removes a single character from the middle of the string', () => {
      expect(removeIndex('hello', 1, 1)).toBe('hllo');
    });

    it('removes multiple characters from the middle of the string', () => {
      expect(removeIndex('abcdef', 2, 3)).toBe('abf');
    });

    it('removes characters from the beginning of the string', () => {
      expect(removeIndex('world', 0, 2)).toBe('rld');
    });

    it('removes characters from the end of the string', () => {
      expect(removeIndex('hello', 3, 2)).toBe('hel');
    });

    it('removes all characters from the string', () => {
      expect(removeIndex('hello', 0, 5)).toBe('');
    });

    // 2. Edge cases with length
    it('returns the original string when length is 0', () => {
      expect(removeIndex('hello', 2, 0)).toBe('hello');
    });

    it('handles length exceeding the remaining string length', () => {
      expect(removeIndex('hello', 3, 10)).toBe('hel');
    });

    // 3. Empty string
    it('returns an empty string when the input is empty', () => {
      expect(removeIndex('', 0, 0)).toBe('');
    });

    it('returns an empty string when removing from an empty string with any length', () => {
      expect(removeIndex('', 0, 5)).toBe('');
    });

    // 4. Single character string
    it('removes the only character in a single character string', () => {
      expect(removeIndex('a', 0, 1)).toBe('');
    });

    it('returns the single character when length is 0', () => {
      expect(removeIndex('a', 0, 0)).toBe('a');
    });

    // 5. Index at the boundary
    it('removes the last character of the string', () => {
      expect(removeIndex('hello', 4, 1)).toBe('hell');
    });

    it('removes the first character of the string', () => {
      expect(removeIndex('hello', 0, 1)).toBe('ello');
    });

    // 6. Index at string length (nothing to remove)
    it('returns the original string when index is at the end', () => {
      expect(removeIndex('hello', 5, 3)).toBe('hello');
    });

    // 7. Strings with special characters
    it('works correctly with strings containing spaces', () => {
      expect(removeIndex('hello world', 5, 1)).toBe('helloworld');
    });

    it('works correctly with strings containing special characters', () => {
      expect(removeIndex('a!b@c#d', 1, 2)).toBe('a@c#d');
    });

    // 8. Removing a large middle section
    it('removes a large section from the middle', () => {
      expect(removeIndex('abcdefghij', 2, 6)).toBe('abij');
    });

    // 9. Unicode characters
    it('works with simple unicode characters', () => {
      expect(removeIndex('café', 2, 1)).toBe('caé');
    });
  });
});
