import * as dict_ from "@razomy/dict";

describe('dict', () => {
  describe('filter', () => {
    // 1. Standard cases
    it('returns entries where the predicate returns true (filter by value)', () => {
      expect(dict_.filter<number>({ a: 1, b: 2, c: 3 }, (v) => v > 1)).toEqual({ b: 2, c: 3 });
    });

    it('returns entries where the predicate returns true (filter by key)', () => {
      expect(dict_.filter<string>({ x: 'foo', y: 'bar' }, (_, k) => k === 'x')).toEqual({ x: 'foo' });
    });

    it('returns an empty dictionary when no entries match the predicate', () => {
      expect(dict_.filter<number>({ a: 10, b: 20 }, () => false)).toEqual({});
    });

    it('returns all entries when every entry matches the predicate', () => {
      expect(dict_.filter<number>({ a: 1, b: 2, c: 3 }, () => true)).toEqual({ a: 1, b: 2, c: 3 });
    });

    // 2. Empty dictionary
    it('returns an empty dictionary when the source dictionary is empty', () => {
      expect(dict_.filter<number>({}, (v) => v > 0)).toEqual({});
    });

    // 3. Callback arguments
    it('passes the correct arguments to the predicate (value, key)', () => {
      const dict = { a: 1, b: 2, c: 3 };
      const args: Array<[number, string]> = [];

      dict_.filter<number>(dict, (value, key) => {
        args.push([value, key]);
        return true;
      });

      expect(args).toEqual(
        expect.arrayContaining([
          [1, 'a'],
          [2, 'b'],
          [3, 'c'],
        ]),
      );
      expect(args.length).toBe(3);
    });

    // 4. Result is a new dictionary (immutability)
    it('returns a new dictionary and does not mutate the original', () => {
      const dict = { a: 1, b: 2, c: 3 };
      const result = dict_.filter<number>(dict, (v) => v > 1);

      expect(result).toEqual({ b: 2, c: 3 });
      expect(dict).toEqual({ a: 1, b: 2, c: 3 });
      expect(result).not.toBe(dict);
    });

    // 5. Complex data types
    it('works correctly with object values', () => {
      const dict = {
        alice: { active: true, age: 30 },
        bob: { active: false, age: 25 },
        charlie: { active: true, age: 35 },
      };

      const result = dict_.filter(dict, (v) => v.active);
      expect(result).toEqual({
        alice: { active: true, age: 30 },
        charlie: { active: true, age: 35 },
      });
    });

    // 6. Single entry dictionary
    it('handles a single-entry dictionary where predicate returns true', () => {
      expect(dict_.filter<number>({ only: 42 }, (v) => v === 42)).toEqual({ only: 42 });
    });

    it('handles a single-entry dictionary where predicate returns false', () => {
      expect(dict_.filter<number>({ only: 42 }, (v) => v !== 42)).toEqual({});
    });

    // 7. Filtering by both key and value
    it('filters using both key and value in the predicate', () => {
      const dict = { a: 1, b: 2, c: 3, d: 4 };
      const result = dict_.filter<number>(dict, (v, k) => v > 1 && k !== 'd');
      expect(result).toEqual({ b: 2, c: 3 });
    });

    // 8. String values
    it('works with string values', () => {
      const dict = { greeting: 'hello', farewell: 'goodbye', question: 'how' };
      const result = dict_.filter<string>(dict, (v) => v.length > 3);
      expect(result).toEqual({ greeting: 'hello', farewell: 'goodbye' });
    });

    // 9. Boolean values
    it('works with boolean values', () => {
      const dict = { a: true, b: false, c: true, d: false };
      const result = dict_.filter<boolean>(dict, (v) => v);
      expect(result).toEqual({ a: true, c: true });
    });
  });
});
