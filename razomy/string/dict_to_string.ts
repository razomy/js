import {Dict} from 'razomy.dict/dict';

export function dictToString<T extends string>(dict: Dict<T>) {
  let res: string = '{';
  for (const dictKey in dict) {
    res += `${dictKey}:${dict[dictKey]};`
  }
  return res + '}';
}


