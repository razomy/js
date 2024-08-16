import {last_index_of} from "razomy.js/string/index";
import {escapeString, unescapeString} from "razomy.js/string/string";
import {string_to_snake_case} from "razomy.js/string/string_to_snake_case";
import {difference, difference_string} from "razomy.js/string/difference";

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
  describe(difference_string.name, () => {
    it('1', () => {
      expect(difference_string([
          "a\n",//
          "b\n",//
          "c\n",//-
          "d\n",//
          "e\n",//
          "f\n",//
          "g\n",//
        ].join(''), [
          "1\n",// +
          "a\n",//
          "b\n",//
          "2\n",// ++
          "c3\n",// ++
          "d\n",//
          "e\n",//
          "4\n",// +
          "f\n",//
          "g\n",//
        ].join('')),
      ).toStrictEqual([
        {"type": "added", "value": "1\n"},
        {"type": "unchanged", "value": "a\nb\n"},
        {"type": "removed", "value": "c\n"},
        {"type": "added", "value": "2\nc3\n"},
        {"type": "unchanged", "value": "d\ne\n"},
        {"type": "added", "value": "4\n"},
        {"type": "unchanged", "value": "f\ng\n"}
      ]);
    });

    it('2', () => {
      expect(difference_string([
          "a\n",//
          "b\n",//-
          "c\n",//-
          "d\n",//
          "e\n",//
          "f\n",//
          "g\n",//
        ].join(''), [
          "a\n",
          "1\n",//+
          "2\n",//+
          "3\n",//+
          "d\n",
          "e\n",
          "f\n",
          "g\n",
          "b\n",//+
          "c\n",//+
        ].join('')
      )).toStrictEqual([
        {"type": "unchanged", "value": "a\n"},
        {"type": "removed", "value": "b\nc\n"},
        {"type": "added", "value": "1\n2\n3\n"},
        {"type": "unchanged", "value": "d\ne\nf\ng\n"},
        {"type": "added", "value": "b\nc\n"}
      ]);
    });
  });
});



