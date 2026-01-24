import {JsonToken, jsonToObject, yamlToObject} from './json_to_object';

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
  console.log(JSON.stringify(result,null,2));
}

export function testYaml() {
  const tokens: JsonToken[] = [
    {tokenType: 'value', value: 'hello', deep: 0},
    {tokenType: 'break', value: '\n', deep: 0},
    {tokenType: 'value', value: 'world', deep: 1}, // Indented, but still part of root scope
    {tokenType: 'break', value: '\n', deep: 1},
  ];
  const result = yamlToObject(tokens);
  console.log(JSON.stringify(result,null,2));
}

testJson()

