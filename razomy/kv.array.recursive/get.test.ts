import {ListItem} from '@razomy/kv.array.recursive';

import {get} from './get';
import {getItemByPath} from './get_item_by_path';


describe('list', () => {
  describe('recursive', () => {
    it(get.name, () => {
      const node: ListItem = ['', [
        ['a1', []],
        ['a2', [
          ['b1', []],
          ['b2', [
            ['c2', []]
          ]]
        ]],
        ['a3', []],
        ['a4', []]
      ]]
      let result = getItemByPath(node, ['a2', 'b2', 'c2'], 0);
      expect(result).toStrictEqual(['c2', []]);
      result = get(node, 'a2:b2:c2');
      expect(result).toStrictEqual(['c2', []]);
    })
  })
});
