import {Dict} from "razomy.js/dict/dict";

export type ValueRecursiveDictOrValue<T> = ValueRecursiveDict<T> | T

interface _ValueRecursiveDict<T> extends Dict<ValueRecursiveDictOrValue<T>> {
}

export class ValueRecursiveDict<T> implements _ValueRecursiveDict<T> {
  [key: string]: ValueRecursiveDictOrValue<T>;

  constructor(args: any = {}) {
    Object.assign(this, args);
  }
}

export function is_value_recursion<T>(obj: ValueRecursiveDictOrValue<T>): obj is ValueRecursiveDict<T> {
  return obj instanceof ValueRecursiveDict;
}

export function d<T = unknown, T1 = object>(_: T1): ValueRecursiveDict<T> & T1 {
  return new ValueRecursiveDict<T>(_) as ValueRecursiveDict<T> & T1;
}