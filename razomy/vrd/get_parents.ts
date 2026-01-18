import {ArgumentException} from 'razomy.exceptions';
import {VrdOrValue} from './vrd';
import {DictKey} from 'razomy.dict';

export function getParents<T>(valueRecursive: VrdOrValue<T>, path: DictKey[], pathOffset: number): VrdOrValue<T>[] {
  for (let key in valueRecursive!) {
    if (key !== path[pathOffset]) {
      continue;
    }
    pathOffset += 1;

    if (pathOffset >= path.length) {
      return [valueRecursive];
    }

    return [valueRecursive, ...getParents(valueRecursive[key], path, pathOffset)]
  }

  throw new ArgumentException('invalid arguments', {valueRecursive, path, pathOffset})
}
