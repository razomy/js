import last_index from "razomy/index/last_index";

describe(`index`, () => {
  describe(last_index.name, () => {
    it('`', () => {
      expect(last_index('', '', 0, 0)).toStrictEqual(-1);
      expect(last_index('', '', 0, 1)).toStrictEqual(-1);
      expect(last_index('0', '0', 0, 1)).toStrictEqual(0);
      expect(last_index('00', '0', 0, 1)).toStrictEqual(0);
      expect(last_index('00', '0', 0, 2)).toStrictEqual(1);
    });
  });
});
