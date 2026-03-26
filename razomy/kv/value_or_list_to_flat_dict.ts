import type { Kv } from './kv';
import * as dict from '@razomy/dict';
import * as key from '@razomy/key';
import * as string from '@razomy/string';

export function valueOrListToFlatDict(
  dict: {},
  input: Kv<string, string>,
  parent: string,
  separator: string,
): dict.Dict<string> {
  if (string.isString(input)) {
    dict[parent] = input;
  } else {
    for (const inputKey of input) {
      valueOrListToFlatDict(dict, inputKey[1], parent + key.ASSIGN + inputKey[0], separator);
    }
  }
  return dict;
}
