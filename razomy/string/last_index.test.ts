import * as string from "@razomy/string";

describe(`index`, () => {
  describe(string.lastIndex.name, () => {
    it('`', () => {
      expect(string.lastIndex('', '', 0, 0)).toStrictEqual(-1);
      expect(string.lastIndex('', '', 0, 1)).toStrictEqual(-1);
      expect(string.lastIndex('0', '0', 0, 1)).toStrictEqual(0);
      expect(string.lastIndex('00', '0', 0, 1)).toStrictEqual(0);
      expect(string.lastIndex('00', '0', 0, 2)).toStrictEqual(1);
    });
  });
});
