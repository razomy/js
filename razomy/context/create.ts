import { merge } from '@razomy/dict';

export interface Context {}

export function create<T extends readonly Record<PropertyKey, unknown>[]>(...array: [...T]) {
  return merge(array);
}
