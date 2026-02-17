import {VrdOrValue} from './vrd';
import {isVrd} from './is_vrd';
import {AbsolutePathString} from '@razomy/path-string';

export function vrdToAbsolutePath<T>(
  input: VrdOrValue<T>,
  absolutePath: AbsolutePathString,
  separator: string): VrdOrValue<T> {
  if (isVrd(input)) {
    for (let inputKey in input) {
      const value = input[inputKey];
      delete input[inputKey];
      const newPrefix = absolutePath
        ? absolutePath + separator + inputKey
        : inputKey;
      input[newPrefix] = vrdToAbsolutePath(value, newPrefix, separator)
    }
    return input;
  } else {
    return input;
  }
}

