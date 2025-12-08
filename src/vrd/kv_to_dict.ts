import {d, ValueRecursiveDict, ValueRecursiveDictOrValue} from "./value";

export function kv_to_dict<T>(arr: [key:string, value:ValueRecursiveDictOrValue<T>, order?:number][]): ValueRecursiveDict<T> {
  const m = d<T>({});
  for (const [key, value] of arr) {
    m[key] = value;
  }
  return m;
}