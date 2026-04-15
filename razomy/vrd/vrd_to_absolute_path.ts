import * as abstracts from '@razomy/abstracts';
import * as vrd from '@razomy/vrd';

export function vrdToAbsolutePath<T>(
  input: vrd.VrdOrValue<T>,
  absolutePath: abstracts.graphs.AbsolutePathString,
  separator: string,
): vrd.VrdOrValue<T> {
  if (vrd.isVrd(input)) {
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
