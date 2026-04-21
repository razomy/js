import * as abstracts from '@razomy/abstracts';
import * as key from '@razomy/dict';
import * as string from '@razomy/string';
import * as kvRecursive from '@razomy/kv-recursive';

export function valueOrListToFlatDict(
  dict: {},
  input: kvRecursive.RecursiveList | string,
  parent: string,
  separator: string,
): abstracts.structures.Dict<string> {
  if (string.isString(input)) {
    dict[parent] = input;
  } else {
    for (const inputKey of input) {
      valueOrListToFlatDict(dict, inputKey[1], parent + key.ASSIGN + inputKey[0], separator);
    }
  }
  return dict;
}
