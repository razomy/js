import * as index from '@razomy/index';

describe(`index`, () => {
  describe(index.lastIndex.name, () => {
    it('`', () => {
      expect(index.lastIndex('', '', 0, 0)).toStrictEqual(-1);
      expect(index.lastIndex('', '', 0, 1)).toStrictEqual(-1);
      expect(index.lastIndex('0', '0', 0, 1)).toStrictEqual(0);
      expect(index.lastIndex('00', '0', 0, 1)).toStrictEqual(0);
      expect(index.lastIndex('00', '0', 0, 2)).toStrictEqual(1);
    });
  });
});
