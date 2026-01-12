import {ListItem} from "razomy/array/recursive/recursive";
import {get, get_item_by_path} from "razomy/array/recursive/get";


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
    let result = get_item_by_path(node, ['a2', 'b2', 'c2'], 0);
    expect(result).toStrictEqual(['c2', []]);
    result = get(node, 'a2:b2:c2');
    expect(result).toStrictEqual(['c2', []]);
  })
  })
});
