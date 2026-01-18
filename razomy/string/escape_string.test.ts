import {escapeString} from 'razomy.string';
import {unescapeString} from 'razomy.string';

describe(`string`, () => {
  describe(escapeString.name, () => {
    it('`', () => {
      const result = escapeString('`', '`');
      expect(result).toStrictEqual('\\`')
    })
    it('\\`', () => {
      expect(unescapeString('\\`', '`')).toStrictEqual('`')
    })
  });
});
