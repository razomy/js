import {Dict} from 'razomy.dict/dict';

export function isKeysInDict<T>(obj: Dict<T>, keys: string[]): boolean {
  return keys.some(key => key in obj);
}


