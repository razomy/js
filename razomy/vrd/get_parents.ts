import type { VrdOrValue } from './vrd';
import * as exceptions from '@razomy/exceptions';
import * as dict from '@razomy/dict';

export function getParents<T>(
  valueRecursive: VrdOrValue<T>,
  path: dict.DictKey[],
  pathOffset: number,
): VrdOrValue<T>[] {
  for (const key in valueRecursive!) {
    if (key !== path[pathOffset]) {
      continue;
    }
    pathOffset += 1;

    if (pathOffset >= path.length) {
      return [valueRecursive];
    }

    return [valueRecursive, ...getParents(valueRecursive[key], path, pathOffset)];
  }

  throw new exceptions.ArgumentException('invalid arguments', { valueRecursive, path, pathOffset });
}
