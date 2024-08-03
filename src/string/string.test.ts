import {last_index_of} from "razomy.js/string/index";
import {escapeString, unescapeString} from "razomy.js/string/string";
import {string_to_snake_case} from "razomy.js/string/string_to_snake_case";

describe('razomy.js.string', () => {
  describe(escapeString.name, () => {
    it('`', () => {
      var result = escapeString('`', '`');
      expect(result).toStrictEqual('\\`')
    })
    it('\\`', () => expect(unescapeString('\\`', '`')).toStrictEqual('`'))
  });

  describe(last_index_of.name, () => {
    it('`', () => {
      expect(last_index_of('', '', 0, 0)).toStrictEqual(-1);
      expect(last_index_of('', '', 0, 1)).toStrictEqual(-1);
      expect(last_index_of('0', '0', 0, 1)).toStrictEqual(0);
      expect(last_index_of('00', '0', 0, 1)).toStrictEqual(0);
      expect(last_index_of('00', '0', 0, 2)).toStrictEqual(1);
    });
  });

  describe(string_to_snake_case.name, () => {
    it('`', () => {
      expect(string_to_snake_case('a-AA')).toStrictEqual('a_aa');
    });
  });
});
