import {Token, yamlToObject} from './yaml_to_object';

export function testGrammar() {
  const tokens: Token[] = [
    {type: 'word', value: 'hello', deep: 0},
    {type: 'break', value: '\n', deep: 0},
    {type: 'word', value: 'world', deep: 1}, // Indented, but still part of root scope
    {type: 'break', value: '\n', deep: 1},
  ];
  const result = yamlToObject(tokens);
  console.log(result);
}
testGrammar()