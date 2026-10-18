import * as string from '@razomy/string';

describe('string', () => {
  describe('similarity', () => {
    // 1. Identical strings
    it('returns 1 for identical strings', () => {
      expect(string.similarity('hello', 'hello')).toBe(1);
    });

    it('returns 1 for identical single character strings', () => {
      expect(string.similarity('a', 'a')).toBe(1);
    });

    // 2. Both empty strings
    it('returns 1 for two empty strings', () => {
      expect(string.similarity('', '')).toBe(1);
    });

    // 3. One empty string
    it('returns 0 when one string is empty and the other is not', () => {
      expect(string.similarity('', 'hello')).toBe(0);
      expect(string.similarity('hello', '')).toBe(0);
    });

    // 4. Completely different strings
    it('returns 0 for completely different strings of the same length', () => {
      expect(string.similarity('abc', 'xyz')).toBe(0);
    });

    // 5. Known Levenshtein distance examples
    it('returns correct similarity for kitten and sitting', () => {
      // Levenshtein distance = 3, max length = 7, similarity = 1 - 3/7
      expect(string.similarity('kitten', 'sitting')).toBeCloseTo(0.5714285714285714, 10);
    });

    it('returns correct similarity for flaw and lawn', () => {
      // Levenshtein distance = 2, max length = 4, similarity = 1 - 2/4 = 0.5
      expect(string.similarity('flaw', 'lawn')).toBe(0.5);
    });

    // 6. Strings differing by one character
    it('returns correct similarity for strings differing by one character (substitution)', () => {
      // 'cat' vs 'car' => distance 1, max length 3, similarity = 1 - 1/3
      expect(string.similarity('cat', 'car')).toBeCloseTo(1 - 1 / 3, 10);
    });

    it('returns correct similarity for strings differing by one insertion', () => {
      // 'cat' vs 'cats' => distance 1, max length 4, similarity = 1 - 1/4 = 0.75
      expect(string.similarity('cat', 'cats')).toBe(0.75);
    });

    it('returns correct similarity for strings differing by one deletion', () => {
      // 'cats' vs 'cat' => distance 1, max length 4, similarity = 1 - 1/4 = 0.75
      expect(string.similarity('cats', 'cat')).toBe(0.75);
    });

    // 7. Symmetry
    it('is symmetric (similarity(a, b) === similarity(b, a))', () => {
      expect(string.similarity('abc', 'def')).toBe(string.similarity('def', 'abc'));
      expect(string.similarity('kitten', 'sitting')).toBe(string.similarity('sitting', 'kitten'));
      expect(string.similarity('hello', 'world')).toBe(string.similarity('world', 'hello'));
    });

    // 8. Strings of different lengths
    it('returns correct similarity for strings of very different lengths', () => {
      // 'a' vs 'abcdef' => distance 5, max length 6, similarity = 1 - 5/6
      expect(string.similarity('a', 'abcdef')).toBeCloseTo(1 - 5 / 6, 10);
    });

    // 9. Single character strings
    it('returns 0 for single character completely different strings', () => {
      expect(string.similarity('a', 'b')).toBe(0);
    });

    // 10. Result is always between 0 and 1
    it('returns a value between 0 and 1 inclusive', () => {
      const pairs: [string, string][] = [
        ['hello', 'world'],
        ['foo', 'bar'],
        ['abc', 'abc'],
        ['', 'test'],
        ['test', ''],
        ['', ''],
        ['abcdefg', 'hijklmn'],
        ['similar', 'similaz'],
      ];

      for (const [a, b] of pairs) {
        const result = string.similarity(a, b);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(1);
      }
    });

    // 11. Case sensitivity
    it('treats uppercase and lowercase as different characters', () => {
      expect(string.similarity('Hello', 'hello')).toBeLessThan(1);
    });

    // 12. Longer similar strings yield higher similarity
    it('returns high similarity for strings that are mostly the same', () => {
      const result = string.similarity('abcdefghij', 'abcdefghik');
      // distance = 1, max length = 10, similarity = 0.9
      expect(result).toBe(0.9);
    });
  });
});
