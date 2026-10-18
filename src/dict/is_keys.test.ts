import * as dict from '@razomy/dict';

describe('dict', () => {
  describe('isKeys', () => {
    // 1. Standard cases
    it('returns true if at least one key exists in the dictionary', () => {
      expect(dict.isKeys({ a: 1, b: 2 }, ['a', 'c'])).toBe(true);
    });

    it('returns true if all specified keys exist in the dictionary', () => {
      expect(dict.isKeys({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toBe(true);
    });

    it('returns false if none of the specified keys exist in the dictionary', () => {
      expect(dict.isKeys({ a: 1, b: 2 }, ['c', 'd'])).toBe(false);
    });

    // 2. Empty dictionary
    it('returns false for an empty dictionary', () => {
      expect(dict.isKeys({}, ['a'])).toBe(false);
    });

    it('returns false for an empty dictionary with multiple keys', () => {
      expect(dict.isKeys({}, ['a', 'b', 'c'])).toBe(false);
    });

    // 3. Empty keys array
    it('returns false when keys array is empty', () => {
      expect(dict.isKeys({ a: 1, b: 2 }, [])).toBe(false);
    });

    it('returns false when both dictionary and keys array are empty', () => {
      expect(dict.isKeys({}, [])).toBe(false);
    });

    // 4. Single key
    it('returns true when a single key matches', () => {
      expect(dict.isKeys({ a: 1 }, ['a'])).toBe(true);
    });

    it('returns false when a single key does not match', () => {
      expect(dict.isKeys({ a: 1 }, ['b'])).toBe(false);
    });

    // 5. Values that are falsy
    it('returns true when the matching key has a falsy value (undefined)', () => {
      expect(dict.isKeys({ a: undefined }, ['a'])).toBe(true);
    });

    it('returns true when the matching key has a falsy value (null)', () => {
      expect(dict.isKeys({ a: null }, ['a'])).toBe(true);
    });

    it('returns true when the matching key has a falsy value (0)', () => {
      expect(dict.isKeys({ a: 0 }, ['a'])).toBe(true);
    });

    it('returns true when the matching key has a falsy value (empty string)', () => {
      expect(dict.isKeys({ a: '' }, ['a'])).toBe(true);
    });

    it('returns true when the matching key has a falsy value (false)', () => {
      expect(dict.isKeys({ a: false }, ['a'])).toBe(true);
    });

    // 6. Short-circuiting behavior
    it('returns true as soon as the first matching key is found', () => {
      expect(dict.isKeys({ a: 1, b: 2, c: 3 }, ['a', 'b', 'c'])).toBe(true);
    });

    // 7. Only last key matches
    it('returns true when only the last key in the array matches', () => {
      expect(dict.isKeys({ z: 1 }, ['a', 'b', 'c', 'z'])).toBe(true);
    });

    // 8. Complex data types as values
    it('works correctly with object values in the dictionary', () => {
      expect(dict.isKeys({ a: { nested: true }, b: [1, 2, 3] }, ['a'])).toBe(true);
      expect(dict.isKeys({ a: { nested: true }, b: [1, 2, 3] }, ['c'])).toBe(false);
    });

    // 9. Inherited properties
    it('returns true for inherited properties (via prototype chain)', () => {
      const proto = { inherited: 'value' };
      const dct = Object.create(proto);
      dct.own = 1;
      expect(dict.isKeys(dct, ['inherited'])).toBe(true);
    });

    // 10. Many keys, none matching
    it('returns false when many keys are provided and none match', () => {
      expect(dict.isKeys({ x: 1, y: 2 }, ['a', 'b', 'c', 'd', 'e', 'f'])).toBe(false);
    });
  });
});
