import {extractPrePathFrom, extractSubPathFrom, escapeString, unescapeString}  from 'razomy.js/string';
import * as path from 'path';

describe('razomy.js.string', () => {
  it('path', () => {
    console.log(extractSubPathFrom(path.resolve(), 'razomy'));
    console.log(extractPrePathFrom(path.resolve(), 'razomy'));
  })
  describe('escape', () => {
    it('`', () => {
      var result = escapeString('`', '`');
      expect(result).toStrictEqual('\\`')
    })
    it('\\`', () => expect(unescapeString('\\`', '`')).toStrictEqual('`'))

  });
});
