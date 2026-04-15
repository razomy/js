import * as dict_ from "@razomy/dict";

describe('dictionary', () => {
  describe('get', () => {
    // 1. Standard cases
    it('returns the value associated with a string key', () => {
      expect(dict_.get({ a: 1 }, 'a')).toBe(1);
    });

    it('returns a string value associated with a key', () => {
      expect(dict_.get({ b: 'hello' }, 'b')).toBe('hello');
    });

    it('returns null when the value is null', () => {
      expect(dict_.get({ c: null }, 'c')).toBeNull();
    });

    // 2. Different value types
    it('returns undefined when the value is explicitly undefined', () => {
      expect(dict_.get({ d: undefined }, 'd')).toBeUndefined();
    });

    it('returns a boolean value', () => {
      expect(dict_.get({ flag: true }, 'flag')).toBe(true);
      expect(dict_.get({ flag: false }, 'flag')).toBe(false);
    });

    it('returns an object value', () => {
      const nested = { x: 10 };
      expect(dict_.get({ obj: nested }, 'obj')).toBe(nested);
    });

    it('returns an array value', () => {
      const arr = [1, 2, 3];
      expect(dict_.get({ list: arr }, 'list')).toBe(arr);
    });

    it('returns a function value', () => {
      function fn() {
        return 42;
      }

      expect(dict_.get({ action: fn }, 'action')).toBe(fn);
    });

    // 3. Numeric and zero values
    it('returns 0 as a value', () => {
      expect(dict_.get({ zero: 0 }, 'zero')).toBe(0);
    });

    it('returns a negative number', () => {
      expect(dict_.get({ neg: -5 }, 'neg')).toBe(-5);
    });

    // 4. Multiple keys in dictionary
    it('returns the correct value when multiple keys exist', () => {
      const dict = { a: 1, b: 2, c: 3 };
      expect(dict_.get(dict, 'a')).toBe(1);
      expect(dict_.get(dict, 'b')).toBe(2);
      expect(dict_.get(dict, 'c')).toBe(3);
    });

    // 5. Non-existent keys
    it('returns undefined for a key that does not exist', () => {
      const dict = { a: 1 } as Record<string, any>;
      expect(dict_.get(dict, 'nonexistent')).toBeUndefined();
    });

    // 6. Empty dictionary
    it('returns undefined when accessing any key on an empty dictionary', () => {
      const dict = {} as Record<string, any>;
      expect(dict_.get(dict, 'anything')).toBeUndefined();
    });

    // 7. Numeric keys
    it('works with numeric keys', () => {
      const dict = { 0: 'zero', 1: 'one' } as Record<number, string>;
      expect(dict_.get(dict, 0)).toBe('zero');
      expect(dict_.get(dict, 1)).toBe('one');
    });

    // 8. Empty string key
    it('works with an empty string key', () => {
      expect(dict_.get({ '': 'empty' }, '')).toBe('empty');
    });

    // 9. Special string values
    it('returns an empty string value', () => {
      expect(dict_.get({ key: '' }, 'key')).toBe('');
    });

    // 10. Does not mutate the dictionary
    it('does not mutate the original dictionary', () => {
      const dict = { a: 1, b: 2 };
      dict_.get(dict, 'a');
      expect(dict).toEqual({ a: 1, b: 2 });
    });
  });
});
