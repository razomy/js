import * as kvRecursive from "@razomy/kv-recursive";

describe('list', () => {
  describe('recursive', () => {
    it(kvRecursive.get.name, () => {
      const node: kvRecursive.ListItem = [
        '',
        [
          ['a1', []],
          [
            'a2',
            [
              ['b1', []],
              ['b2', [['c2', []]]],
            ],
          ],
          ['a3', []],
          ['a4', []],
        ],
      ];
      let result = kvRecursive.getItemByPath(node, ['a2', 'b2', 'c2'], 0);
      expect(result).toStrictEqual(['c2', []]);
      result = kvRecursive.get(node, 'a2:b2:c2');
      expect(result).toStrictEqual(['c2', []]);
    });
  });
});
