import { unescapeByString } from '@razomy/string';
import { escapeByString } from '@razomy/string';

describe(`string`, () => {
  describe(escapeByString.name, () => {
    it('`', () => {
      const result = escapeByString('`', '`');
      expect(result).toStrictEqual('\\`');
    });
    it('\\`', () => {
      expect(unescapeByString('\\`', '`')).toStrictEqual('`');
    });
  });
});
