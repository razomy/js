import * as string from "@razomy/string";

describe('levenshteinDistance', () => {
  // 1. Standard cases
  it('returns 3 for "kitten" and "sitting"', () => {
    expect(string.levenshteinDistance('kitten', 'sitting')).toBe(3);
  });

  it('returns 1 for "test" and "text"', () => {
    expect(string.levenshteinDistance('test', 'text')).toBe(1);
  });

  it('returns 0 for identical strings', () => {
    expect(string.levenshteinDistance('razomy', 'razomy')).toBe(0);
  });

  // 2. Empty strings
  it('returns the length of the other string when the first string is empty', () => {
    expect(string.levenshteinDistance('', 'hello')).toBe(5);
  });

  it('returns the length of the other string when the second string is empty', () => {
    expect(string.levenshteinDistance('hello', '')).toBe(5);
  });

  it('returns 0 when both strings are empty', () => {
    expect(string.levenshteinDistance('', '')).toBe(0);
  });

  // 3. Single character strings
  it('returns 1 for single different characters', () => {
    expect(string.levenshteinDistance('a', 'b')).toBe(1);
  });

  it('returns 0 for single identical characters', () => {
    expect(string.levenshteinDistance('a', 'a')).toBe(0);
  });

  it('returns 1 for a single character and an empty string', () => {
    expect(string.levenshteinDistance('a', '')).toBe(1);
    expect(string.levenshteinDistance('', 'a')).toBe(1);
  });

  // 4. Completely different strings
  it('returns the length of the longer string when strings share no characters', () => {
    expect(string.levenshteinDistance('abc', 'xyz')).toBe(3);
  });

  // 5. Insertion only
  it('handles cases where only insertions are needed', () => {
    expect(string.levenshteinDistance('abc', 'abcd')).toBe(1);
    expect(string.levenshteinDistance('a', 'abc')).toBe(2);
  });

  // 6. Deletion only
  it('handles cases where only deletions are needed', () => {
    expect(string.levenshteinDistance('abcd', 'abc')).toBe(1);
    expect(string.levenshteinDistance('abc', 'a')).toBe(2);
  });

  // 7. Substitution only
  it('handles cases where only substitutions are needed', () => {
    expect(string.levenshteinDistance('abc', 'axc')).toBe(1);
    expect(string.levenshteinDistance('abc', 'xyz')).toBe(3);
  });

  // 8. Symmetry - order of arguments should not matter
  it('is symmetric: distance(a, b) equals distance(b, a)', () => {
    expect(string.levenshteinDistance('kitten', 'sitting')).toBe(string.levenshteinDistance('sitting', 'kitten'));
    expect(string.levenshteinDistance('test', 'text')).toBe(string.levenshteinDistance('text', 'test'));
    expect(string.levenshteinDistance('abc', 'defgh')).toBe(string.levenshteinDistance('defgh', 'abc'));
  });

  // 9. Swapping optimization (a.length > b.length triggers swap)
  it('handles the case where the first string is longer than the second', () => {
    expect(string.levenshteinDistance('sitting', 'kitten')).toBe(3);
    expect(string.levenshteinDistance('longer', 'short')).toBe(string.levenshteinDistance('short', 'longer'));
  });

  // 10. Longer strings
  it('handles longer strings correctly', () => {
    expect(string.levenshteinDistance('intention', 'execution')).toBe(5);
    expect(string.levenshteinDistance('saturday', 'sunday')).toBe(3);
  });

  // 11. Strings with repeated characters
  it('handles strings with repeated characters', () => {
    expect(string.levenshteinDistance('aaa', 'aaaa')).toBe(1);
    expect(string.levenshteinDistance('aaa', 'aaa')).toBe(0);
    expect(string.levenshteinDistance('aaa', 'bbb')).toBe(3);
  });

  // 12. Case sensitivity
  it('treats uppercase and lowercase as different characters', () => {
    expect(string.levenshteinDistance('ABC', 'abc')).toBe(3);
    expect(string.levenshteinDistance('Hello', 'hello')).toBe(1);
  });

  // 13. Prefix/suffix relationships
  it('handles strings where one is a prefix of the other', () => {
    expect(string.levenshteinDistance('app', 'apple')).toBe(2);
    expect(string.levenshteinDistance('apple', 'app')).toBe(2);
  });

  it('handles strings where one is a suffix of the other', () => {
    expect(string.levenshteinDistance('ing', 'testing')).toBe(4);
  });
});
