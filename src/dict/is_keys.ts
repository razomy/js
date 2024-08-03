import {Dict} from "razomy.js/dict/dict";

export function isKeys<T>(obj: Dict<T>, keys: string[]): boolean {
  return keys.some(key => key in obj);
}