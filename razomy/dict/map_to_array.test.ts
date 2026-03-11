import { mapToArray } from './map_to_array';

describe('object', () => {
  describe('mapToArray', () => {
    // 1. Standard cases
    it('maps object entries to an array of transformed values', () => {
      expect(mapToArray({ a: 1, b: 2 }, (k, v) => `${k}${v}`)).toEqual(['a1', 'b2']);
    });

    it('maps a single-entry object correctly', () => {
      expect(mapToArray({ x: 10 }, (k, v) => v * 2)).toEqual([20]);
    });

    // 2. Empty object
    it('returns an empty array for an empty object', () => {
      expect(mapToArray({}, (k, v) => v)).toEqual([]);
    });

    // 3. Callback arguments
    it('passes the correct key and value to the callback', () => {
      const args: Array<[string, number]> = [];
      mapToArray({ foo: 1, bar: 2 }, (k, v) => {
        args.push([k, v]);
        return v;
      });

      expect(args).toEqual([
        ['foo', 1],
        ['bar', 2],
      ]);
    });

    // 4. Different return types
    it('supports returning objects from the callback', () => {
      const result = mapToArray({ a: 1, b: 2 }, (k, v) => ({ key: k, value: v }));
      expect(result).toEqual([
        { key: 'a', value: 1 },
        { key: 'b', value: 2 },
      ]);
    });

    it('supports returning booleans from the callback', () => {
      const result = mapToArray({ a: 1, b: 0, c: 3 }, (_k, v) => v > 0);
      expect(result).toEqual([true, false, true]);
    });

    it('supports returning arrays from the callback', () => {
      const result = mapToArray({ a: 1, b: 2 }, (k, v) => [k, v]);
      expect(result).toEqual([['a', 1], ['b', 2]]);
    });

    // 5. Complex value types
    it('works with object values that are strings', () => {
      const result = mapToArray({ greeting: 'hello', farewell: 'bye' }, (k, v) => `${k}: ${v}`);
      expect(result).toEqual(['greeting: hello', 'farewell: bye']);
    });

    it('works with object values that are arrays', () => {
      const result = mapToArray({ a: [1, 2], b: [3, 4] }, (_k, v) => v.length);
      expect(result).toEqual([2, 2]);
    });

    it('works with object values that are nested objects', () => {
      const obj = { user1: { name: 'Alice' }, user2: { name: 'Bob' } };
      const result = mapToArray(obj, (k, v) => `${k}-${v.name}`);
      expect(result).toEqual(['user1-Alice', 'user2-Bob']);
    });

    // 6. Result length matches number of keys
    it('returns an array with the same length as the number of keys', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      const result = mapToArray(obj, (_k, v) => v);
      expect(result).toHaveLength(5);
    });

    // 7. Callback using only key
    it('works when callback only uses the key', () => {
      const result = mapToArray({ first: 100, second: 200 }, (k) => k.toUpperCase());
      expect(result).toEqual(['FIRST', 'SECOND']);
    });

    // 8. Callback using only value
    it('works when callback only uses the value', () => {
      const result = mapToArray({ a: 5, b: 10, c: 15 }, (_k, v) => v + 1);
      expect(result).toEqual([6, 11, 16]);
    });
  });
});