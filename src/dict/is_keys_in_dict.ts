import {Dict} from "razomy/dict/dict";

export function is_keys_in_dict<T>(obj: Dict<T>, keys: string[]): boolean {
  return keys.some(key => key in obj);
}