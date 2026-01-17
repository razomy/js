import {lastIndex} from 'razomy.index/last_index';

describe(`index`, () => {
  describe(lastIndex.name, () => {
    it('`', () => {
      expect(lastIndex('', '', 0, 0)).toStrictEqual(-1);
      expect(lastIndex('', '', 0, 1)).toStrictEqual(-1);
      expect(lastIndex('0', '0', 0, 1)).toStrictEqual(0);
      expect(lastIndex('00', '0', 0, 1)).toStrictEqual(0);
      expect(lastIndex('00', '0', 0, 2)).toStrictEqual(1);
    });
  });
});
