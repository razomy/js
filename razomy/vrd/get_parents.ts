import * as exceptions from '@razomy/exceptions';
import * as abstracts from '@razomy/abstracts';
import * as vrd from '@razomy/vrd';

export function getParents<T>(
  valueRecursive: vrd.VrdOrValue<T>,
  path: abstracts.structures.Key[],
  pathOffset: number,
): vrd.VrdOrValue<T>[] {
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
