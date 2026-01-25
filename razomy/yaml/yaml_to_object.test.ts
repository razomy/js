import {JsonToken, yamlToObject} from './yaml_to_object';

export function testYaml() {
  const tokens: JsonToken[] = [
    {tokenType: 'value', value: 'hello', deep: 0},
    {tokenType: 'break', value: '\n', deep: 0},
    {tokenType: 'value', value: 'world', deep: 1}, // Indented, but still part of root scope
    {tokenType: 'break', value: '\n', deep: 1},
  ];
  const result = yamlToObject(tokens);
  console.log(JSON.stringify(result, null, 2));
}

describe('', () => {
    testYaml()
  }
)

