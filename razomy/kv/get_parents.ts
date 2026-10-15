import * as exceptions from '@razomy/exceptions';
import * as kv from '@razomy/kv';
import * as abstractions from '@razomy/abstractions';

export function getParents<T>(
  valueRecursive: abstractions.structures.KvaOrValue<T, T>,
  path: abstractions.components.Slug[],
  pathOffset: number,
): abstractions.structures.KvaOrValue<T, T>[] {
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
