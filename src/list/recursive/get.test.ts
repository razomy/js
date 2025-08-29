import {ListItem} from "razomy.js/list/recursive/recursive";
import {get, getItemByPath} from "razomy.js/list/recursive/get";


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
