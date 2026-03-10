import { isObject } from '../object/is_object';
import type { DictRecursive } from './recursive';

export function merge<T extends DictRecursive>(target: T, ...sources: DictRecursive[]): T {
  if (!sources.length) return target;
  const source = sources.shift();
  if (source && isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        merge(target[key] as DictRecursive, source[key] as DictRecursive);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return merge(target, ...sources);
}
