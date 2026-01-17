import {escapeString} from 'razomy.string/escape_string';
import {unescapeString} from 'razomy.string/unescape_string';

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
