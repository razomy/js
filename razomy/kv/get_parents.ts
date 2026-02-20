import {ArgumentException} from '@razomy/exceptions';
import type {Valuable} from '@razomy/kv';
import {isAkv} from '@razomy/kv';
import type {Slug} from '@razomy/path-string';

export function getParents<T>(valueRecursive: Valuable<T, T>, path: Slug[], pathOffset: number): Valuable<T, T>[] {
  if (isAkv(valueRecursive)) {
    for (let [key, value] of valueRecursive!) {
      if (key !== path[pathOffset]) {
        continue;
      }
      pathOffset += 1;

      if (pathOffset >= path.length) {
        return [valueRecursive];
      }

      return [valueRecursive, ...getParents(value, path, pathOffset)]
    }
  }

  throw new ArgumentException('invalid arguments', {valueRecursive, path, pathOffset})
}
