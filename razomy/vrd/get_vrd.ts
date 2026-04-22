import * as exceptions from '@razomy/exceptions';
import * as vrd from '@razomy/vrd';
import * as abstracts from '@razomy/abstracts';

export function getVrd<T>(
  valueRecursive: vrd.VrdOrValue<T>,
  path: abstracts.structures.Key[],
  pathOffset: number,
): vrd.VrdOrValue<T> {
  for (const key in valueRecursive!) {
    if (key !== path[pathOffset]) {
      continue;
    }
    pathOffset += 1;

    if (pathOffset >= path.length) {
      return valueRecursive[key];
    }

    return getVrd(valueRecursive[key], path, pathOffset);
  }

  throw new exceptions.ArgumentException('invalid arguments', { valueRecursive, path, pathOffset });
}
