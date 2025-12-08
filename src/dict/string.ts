import {Dict} from 'razomy.js/dict/dict';

export function dict_to_string<T extends string>(dict: Dict<T>) {
  let res: string = '{';
  for (const dictKey in dict) {
    res += `${dictKey}:${dict[dictKey]};`
  }
  return res + '}';
}
