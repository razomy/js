import * as exceptions from '@razomy/exceptions';
import * as vrd from '@razomy/vrd';
import * as abstractions from '@razomy/abstractions';

export function getVrd<T>(
  valueRecursive: vrd.VrdOrValue<T>,
  path: abstractions.structure.Key[],
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
