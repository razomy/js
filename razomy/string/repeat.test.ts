import { repeat } from './repeat';

describe('string', () => {
  describe('repeat', () => {
    // 1. Standard cases
    it('repeats a single character multiple times', () => {
      expect(repeat('a', 3)).toBe('aaa');
    });

    it('repeats a word multiple times', () => {
      expect(repeat('razomy', 2)).toBe('razomyrazomy');
    });

    it('repeats a string once', () => {
      expect(repeat('hello', 1)).toBe('hello');
    });

    // 2. Zero count
    it('returns an empty string when count is 0', () => {
      expect(repeat('test', 0)).toBe('');
    });

    it('returns an empty string when repeating any string 0 times', () => {
      expect(repeat('abc', 0)).toBe('');
    });

    // 3. Empty string
    it('returns an empty string when content is empty regardless of count', () => {
      expect(repeat('', 5)).toBe('');
    });

    it('returns an empty string when both content is empty and count is 0', () => {
      expect(repeat('', 0)).toBe('');
    });

    // 4. Special characters
    it('repeats strings with special characters', () => {
      expect(repeat('!@#', 2)).toBe('!@#!@#');
    });

    it('repeats strings with spaces', () => {
      expect(repeat(' ', 4)).toBe('    ');
    });

    it('repeats strings with newlines', () => {
      expect(repeat('\n', 3)).toBe('\n\n\n');
    });

    // 5. Unicode characters
    it('repeats strings with unicode characters', () => {
      expect(repeat('🚀', 3)).toBe('🚀🚀🚀');
    });

    // 6. Larger counts
    it('repeats a string a large number of times', () => {
      const result = repeat('ab', 100);
      expect(result.length).toBe(200);
      expect(result).toBe('ab'.repeat(100));
    });

    // 7. Multi-word strings
    it('repeats multi-word strings correctly', () => {
      expect(repeat('ha ', 3)).toBe('ha ha ha ');
    });
  });
});
