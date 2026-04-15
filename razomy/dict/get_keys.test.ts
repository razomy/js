import * as dict from '@razomy/dict';

describe('object', () => {
  describe('getKeys', () => {
    // 1. Standard cases
    it('returns the keys of a simple object', () => {
      expect(dict.getKeys({ a: 1, b: 2 })).toEqual(['a', 'b']);
    });

    it('returns the keys of an object with string values', () => {
      expect(dict.getKeys({ name: 'Raz', id: 101 })).toEqual(['name', 'id']);
    });

    // 2. Empty object
    it('returns an empty array for an empty object', () => {
      expect(dict.getKeys({})).toEqual([]);
    });

    // 3. Various value types
    it('returns keys regardless of value types', () => {
      const obj = { str: 'hello', num: 42, bool: true, nul: null, undef: undefined, arr: [1, 2], nested: { a: 1 } };
      expect(dict.getKeys(obj)).toEqual(['str', 'num', 'bool', 'nul', 'undef', 'arr', 'nested']);
    });

    // 4. Only own enumerable properties
    it('does not include inherited properties', () => {
      const parent = { inherited: true };
      const child = Object.create(parent);
      child.own = 'yes';

      expect(dict.getKeys(child)).toEqual(['own']);
    });

    it('does not include non-enumerable properties', () => {
      const obj: Record<string, unknown> = { visible: 1 };
      Object.defineProperty(obj, 'hidden', { value: 2, enumerable: false });

      expect(dict.getKeys(obj)).toEqual(['visible']);
    });

    // 5. Numeric keys (converted to strings)
    it('returns numeric keys as strings', () => {
      const obj = { 0: 'a', 1: 'b', 2: 'c' };
      expect(dict.getKeys(obj)).toEqual(['0', '1', '2']);
    });

    // 6. Single key object
    it('returns an array with a single key for a single-property object', () => {
      expect(dict.getKeys({ only: 'one' })).toEqual(['only']);
    });

    // 7. Symbol keys are not included (Object.keys excludes symbols)
    it('does not include symbol keys', () => {
      const sym = Symbol('test');
      const obj = { a: 1, [sym]: 2 } as Record<string | symbol, number>;

      expect(dict.getKeys(obj)).toEqual(['a']);
    });

    // 8. Array-like objects
    it('returns index keys for arrays', () => {
      const arr = ['x', 'y', 'z'];
      expect(dict.getKeys(arr)).toEqual(['0', '1', '2']);
    });

    // 9. Order preservation
    it('preserves insertion order of keys', () => {
      const obj: Record<string, number> = {};
      obj.c = 3;
      obj.a = 1;
      obj.b = 2;

      expect(dict.getKeys(obj)).toEqual(['c', 'a', 'b']);
    });
  });
});
