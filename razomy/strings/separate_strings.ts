import * as string from '@razomy/string';
import * as abstracts from "@razomy/abstracts";

export function separateStrings(
  string: string.String,
  offset: abstracts.arrays.Offset,
  separateString: string.String,
  strings: string.String[],
) {
  let ix = string.indexOf(separateString, offset);
  while (ix !== -1) {
    strings.push(string.substring(offset, ix + 1));
    offset = ix + 1;
    ix = string.indexOf(separateString, offset);
  }

  if (offset < string.length) {
    strings.push(string.substring(offset));
  }

  return strings;
}
