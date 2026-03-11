import { levenshteinDistance } from './levenshtein_distance';

describe('levenshteinDistance', () => {
  // 1. Standard cases
  it('returns 3 for "kitten" and "sitting"', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
  });

  it('returns 1 for "test" and "text"', () => {
    expect(levenshteinDistance('test', 'text')).toBe(1);
  });

  it('returns 0 for identical strings', () => {
    expect(levenshteinDistance('razomy', 'razomy')).toBe(0);
  });

  // 2. Empty strings
  it('returns the length of the other string when the first string is empty', () => {
    expect(levenshteinDistance('', 'hello')).toBe(5);
  });

  it('returns the length of the other string when the second string is empty', () => {
    expect(levenshteinDistance('hello', '')).toBe(5);
  });

  it('returns 0 when both strings are empty', () => {
    expect(levenshteinDistance('', '')).toBe(0);
  });

  // 3. Single character strings
  it('returns 1 for single different characters', () => {
    expect(levenshteinDistance('a', 'b')).toBe(1);
  });

  it('returns 0 for single identical characters', () => {
    expect(levenshteinDistance('a', 'a')).toBe(0);
  });

  it('returns 1 for a single character and an empty string', () => {
    expect(levenshteinDistance('a', '')).toBe(1);
    expect(levenshteinDistance('', 'a')).toBe(1);
  });

  // 4. Completely different strings
  it('returns the length of the longer string when strings share no characters', () => {
    expect(levenshteinDistance('abc', 'xyz')).toBe(3);
  });

  // 5. Insertion only
  it('handles cases where only insertions are needed', () => {
    expect(levenshteinDistance('abc', 'abcd')).toBe(1);
    expect(levenshteinDistance('a', 'abc')).toBe(2);
  });

  // 6. Deletion only
  it('handles cases where only deletions are needed', () => {
    expect(levenshteinDistance('abcd', 'abc')).toBe(1);
    expect(levenshteinDistance('abc', 'a')).toBe(2);
  });

  // 7. Substitution only
  it('handles cases where only substitutions are needed', () => {
    expect(levenshteinDistance('abc', 'axc')).toBe(1);
    expect(levenshteinDistance('abc', 'xyz')).toBe(3);
  });

  // 8. Symmetry - order of arguments should not matter
  it('is symmetric: distance(a, b) equals distance(b, a)', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(levenshteinDistance('sitting', 'kitten'));
    expect(levenshteinDistance('test', 'text')).toBe(levenshteinDistance('text', 'test'));
    expect(levenshteinDistance('abc', 'defgh')).toBe(levenshteinDistance('defgh', 'abc'));
  });

  // 9. Swapping optimization (a.length > b.length triggers swap)
  it('handles the case where the first string is longer than the second', () => {
    expect(levenshteinDistance('sitting', 'kitten')).toBe(3);
    expect(levenshteinDistance('longer', 'short')).toBe(levenshteinDistance('short', 'longer'));
  });

  // 10. Longer strings
  it('handles longer strings correctly', () => {
    expect(levenshteinDistance('intention', 'execution')).toBe(5);
    expect(levenshteinDistance('saturday', 'sunday')).toBe(3);
  });

  // 11. Strings with repeated characters
  it('handles strings with repeated characters', () => {
    expect(levenshteinDistance('aaa', 'aaaa')).toBe(1);
    expect(levenshteinDistance('aaa', 'aaa')).toBe(0);
    expect(levenshteinDistance('aaa', 'bbb')).toBe(3);
  });

  // 12. Case sensitivity
  it('treats uppercase and lowercase as different characters', () => {
    expect(levenshteinDistance('ABC', 'abc')).toBe(3);
    expect(levenshteinDistance('Hello', 'hello')).toBe(1);
  });

  // 13. Prefix/suffix relationships
  it('handles strings where one is a prefix of the other', () => {
    expect(levenshteinDistance('app', 'apple')).toBe(2);
    expect(levenshteinDistance('apple', 'app')).toBe(2);
  });

  it('handles strings where one is a suffix of the other', () => {
    expect(levenshteinDistance('ing', 'testing')).toBe(4);
  });
});
