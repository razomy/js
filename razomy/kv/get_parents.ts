import * as exceptions from '@razomy/exceptions';
import * as kv from '@razomy/kv';
import * as abstracts from '@razomy/abstracts';

export function getParents<T>(
  valueRecursive: abstracts.structures.KvaOrValue<T, T>,
  path: abstracts.graphs.Slug[],
  pathOffset: number,
): abstracts.structures.KvaOrValue<T, T>[] {
  if (kv.isAkv(valueRecursive)) {
    for (const [key, value] of valueRecursive!) {
      if (key !== path[pathOffset]) {
        continue;
      }
      pathOffset += 1;

      if (pathOffset >= path.length) {
        return [valueRecursive];
      }

      return [valueRecursive, ...getParents(value, path, pathOffset)];
    }
  }

  throw new exceptions.ArgumentException('invalid arguments', { valueRecursive, path, pathOffset });
}
