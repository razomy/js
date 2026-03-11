import { countString } from './count_string';

describe('countString', () => {
  // 1. Standard cases
  it('counts occurrences of a string in the full array', () => {
    expect(countString(['a', 'b', 'a', 'c'], 'a', 0, 4)).toBe(2);
  });

  it('counts occurrences within a subarray', () => {
    expect(countString(['hello', 'world', 'hello'], 'hello', 1, 3)).toBe(1);
  });

  it('returns 0 when the string is not found', () => {
    expect(countString(['x', 'y', 'z'], 'w', 0, 3)).toBe(0);
  });

  // 2. Empty range
  it('returns 0 when offset equals maxOffset', () => {
    expect(countString(['a', 'b', 'c'], 'a', 0, 0)).toBe(0);
  });

  it('returns 0 when offset is greater than maxOffset', () => {
    expect(countString(['a', 'b', 'c'], 'a', 3, 1)).toBe(0);
  });

  // 3. Empty array
  it('returns 0 for an empty array', () => {
    expect(countString([], 'a', 0, 0)).toBe(0);
  });

  // 4. Single element
  it('returns 1 when single element matches', () => {
    expect(countString(['a'], 'a', 0, 1)).toBe(1);
  });

  it('returns 0 when single element does not match', () => {
    expect(countString(['b'], 'a', 0, 1)).toBe(0);
  });

  // 5. All elements match
  it('counts correctly when all elements in the range match', () => {
    expect(countString(['a', 'a', 'a', 'a'], 'a', 0, 4)).toBe(4);
  });

  // 6. Partial range from the middle
  it('counts occurrences only within the specified range', () => {
    expect(countString(['a', 'b', 'a', 'b', 'a'], 'a', 1, 4)).toBe(1);
  });

  it('counts correctly for a range starting in the middle', () => {
    expect(countString(['a', 'a', 'a', 'b', 'b'], 'a', 2, 5)).toBe(1);
  });

  // 7. Offset at the end of the array
  it('returns 0 when offset starts at the last element and maxOffset is beyond array', () => {
    expect(countString(['a', 'b', 'c'], 'c', 2, 3)).toBe(1);
  });

  // 8. Case sensitivity
  it('is case-sensitive when comparing strings', () => {
    expect(countString(['A', 'a', 'A', 'a'], 'a', 0, 4)).toBe(2);
    expect(countString(['A', 'a', 'A', 'a'], 'A', 0, 4)).toBe(2);
  });

  // 9. Empty string matching
  it('counts occurrences of an empty string', () => {
    expect(countString(['', 'a', '', 'b'], '', 0, 4)).toBe(2);
  });

  // 10. Strings with spaces and special characters
  it('counts strings with spaces and special characters', () => {
    expect(countString(['foo bar', 'baz', 'foo bar', 'qux'], 'foo bar', 0, 4)).toBe(2);
  });

  it('matches strings with special characters exactly', () => {
    expect(countString(['a.b', 'a*b', 'a.b'], 'a.b', 0, 3)).toBe(2);
  });

  // 11. maxOffset beyond array length
  it('handles maxOffset beyond array length without errors', () => {
    expect(countString(['a', 'b', 'a'], 'a', 0, 10)).toBe(2);
  });

  // 12. Large array
  it('counts correctly in a larger array', () => {
    const arr = Array.from({ length: 1000 }, (_, i) => (i % 3 === 0 ? 'match' : 'other'));
    expect(countString(arr, 'match', 0, 1000)).toBe(334);
  });

  // 13. Boundary: range of size 1
  it('returns 1 for a single-element range that matches', () => {
    expect(countString(['a', 'b', 'c'], 'b', 1, 2)).toBe(1);
  });

  it('returns 0 for a single-element range that does not match', () => {
    expect(countString(['a', 'b', 'c'], 'a', 1, 2)).toBe(0);
  });
});
