import {Dict} from 'razomy.dict/dict';

export function dict_to_string<T extends string>(dict: Dict<T>) {
  let res: string = '{';
  for (const dict_key in dict) {
    res += `${dict_key}:${dict[dict_key]};`
  }
  return res + '}';
}


