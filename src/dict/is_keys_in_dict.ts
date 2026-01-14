import {Dict} from "razomy.dict/dict";

function is_keys_in_dict<T>(obj: Dict<T>, keys: string[]): boolean {
  return keys.some(key => key in obj);
}

export default is_keys_in_dict;
