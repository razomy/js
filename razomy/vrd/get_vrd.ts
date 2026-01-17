import {ArgumentException} from 'razomy.exceptions/argument_exception';
import {VrdOrValue} from 'razomy.vrd/vrd';
import {DictKey} from 'razomy.dict/dict';

export function getVrd<T>(valueRecursive: VrdOrValue<T>, path: DictKey[], pathOffset: number): VrdOrValue<T> {
  for (let key in valueRecursive!) {
    if (key !== path[pathOffset]) {
      continue;
    }
    pathOffset += 1;

    if (pathOffset >= path.length) {
      return valueRecursive[key];
    }

    return getVrd(valueRecursive[key], path, pathOffset)
  }

  throw new ArgumentException('invalid arguments', {valueRecursive, path, pathOffset})
}
