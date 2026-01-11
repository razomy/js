import {escape_string} from "razomy/string/escape_string";
import {unescape_string} from "razomy/string/unescape_string";

describe(`string`, () => {
  describe(escape_string.name, () => {
    it('`', () => {
      const result = escape_string('`', '`');
      expect(result).toStrictEqual('\\`')
    })
    it('\\`', () => {
      expect(unescape_string('\\`', '`')).toStrictEqual('`')
    })
  });
});
