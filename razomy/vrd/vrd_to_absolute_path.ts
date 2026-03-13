import type { VrdOrValue } from './vrd';
import { isVrd } from './is_vrd';
import * as abstracts from '@razomy/abstracts';

export function vrdToAbsolutePath<T>(
  input: VrdOrValue<T>,
  absolutePath: abstracts.graphs.AbsolutePathString,
  separator: string,
): VrdOrValue<T> {
  if (isVrd(input)) {
    for (const inputKey in input) {
      const value = input[inputKey];
      delete input[inputKey];
      const newPrefix = absolutePath ? absolutePath + separator + inputKey : inputKey;
      input[newPrefix] = vrdToAbsolutePath(value, newPrefix, separator);
    }
    return input;
  } else {
    return input;
  }
}
