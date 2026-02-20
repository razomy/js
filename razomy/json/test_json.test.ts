import {type JsonToken, jsonToObject} from './json_to_object';

export function testJson() {
  const tokens: JsonToken[] = [
    {tokenType: 'value', value: 'a', deep: 0}, {tokenType: 'assign', value: ':', deep: 0},
    {tokenType: 'value', value: 'b', deep: 0}, {tokenType: 'assign', value: ':', deep: 0},
    {tokenType: 'value', value: 'c', deep: 0}, {tokenType: 'break', value: '\n', deep: 0},
    {tokenType: 'value', value: 'parent', deep: 0}, {tokenType: 'assign', value: ':', deep: 0},
    {tokenType: 'break', value: '\n', deep: 0},
    {tokenType: 'value', value: 'child', deep: 1}, {tokenType: 'assign', value: ':', deep: 1},
    {tokenType: 'value', value: '1', deep: 1}, {tokenType: 'break', value: '\n', deep: 1},
  ];
  const result = jsonToObject(tokens);
  console.log(JSON.stringify(result, null, 2));
}

describe('s', () => {
    test('f', () => {
      testJson()
    })
  }
)

