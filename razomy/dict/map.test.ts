import * as dict from "@razomy/dict";

describe('dictionary', () => {
  describe('map', () => {
    // 1. Standard cases
    it('maps each value using the callback function', () => {
      expect(dict.map({ a: 1, b: 2 }, (v) => v * 2)).toEqual({ a: 2, b: 4 });
    });

    it('maps values with a string transformation', () => {
      expect(dict.map({ x: 'hello', y: 'world' }, (v) => v.toUpperCase())).toEqual({
        x: 'HELLO',
        y: 'WORLD',
      });
    });

    // 2. Empty object
    it('returns an empty object when given an empty object', () => {
      expect(dict.map({}, (v) => v)).toEqual({});
    });

    // 3. Callback arguments (value and key)
    it('passes the correct arguments to the callback (value, key)', () => {
      expect(dict.map({ a: 'hi' }, (v, k) => `${k}:${v}`)).toEqual({ a: 'a:hi' });
    });

    it('passes value and key for every entry', () => {
      const args: Array<[number, string]> = [];

      dict.map({ foo: 1, bar: 2, baz: 3 }, (value, key) => {
        args.push([value, key]);
        return value;
      });

      expect(args).toEqual(
        expect.arrayContaining([
          [1, 'foo'],
          [2, 'bar'],
          [3, 'baz'],
        ]),
      );
      expect(args.length).toBe(3);
    });

    // 4. Preserves keys
    it('preserves the original keys in the resulting object', () => {
      const result = dict.map({ name: 'Alice', age: 'thirty' }, (v) => v.length);
      expect(Object.keys(result)).toEqual(expect.arrayContaining(['name', 'age']));
      expect(result).toEqual({ name: 5, age: 6 });
    });

    // 5. Type transformation (values change type)
    it('can transform values to a different type', () => {
      const result = dict.map({ a: 1, b: 2, c: 3 }, (v) => v > 1);
      expect(result).toEqual({ a: false, b: true, c: true });
    });

    it('can transform values to arrays', () => {
      const result = dict.map({ a: 1, b: 2 }, (v, k) => [k, v]);
      expect(result).toEqual({ a: ['a', 1], b: ['b', 2] });
    });

    // 6. Single entry object
    it('works correctly with a single-entry object', () => {
      expect(dict.map({ only: 42 }, (v) => v + 8)).toEqual({ only: 50 });
    });

    // 7. Does not mutate the original object
    it('does not mutate the original object', () => {
      const original = { a: 1, b: 2 };
      const result = dict.map(original, (v) => v * 10);

      expect(result).toEqual({ a: 10, b: 20 });
      expect(original).toEqual({ a: 1, b: 2 });
    });

    // 8. Complex data types as values
    it('works correctly with objects as values', () => {
      const input = {
        user1: { name: 'Alice', score: 10 },
        user2: { name: 'Bob', score: 20 },
      };
      const result = dict.map(input, (v) => v.score);
      expect(result).toEqual({ user1: 10, user2: 20 });
    });

    // 9. Handles undefined/null values
    it('handles undefined and null values correctly', () => {
      const result = dict.map({ a: undefined, b: null } as Record<string, unknown>, (v) =>
        v === null ? 'null' : 'undefined',
      );
      expect(result).toEqual({ a: 'undefined', b: 'null' });
    });

    // 10. Returns a new object reference
    it('returns a new object (not the same reference)', () => {
      const original = { a: 1 };
      const result = dict.map(original, (v) => v);
      expect(result).toEqual(original);
      expect(result).not.toBe(original);
    });
  });
});
