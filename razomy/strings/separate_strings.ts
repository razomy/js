import * as abstractions from "@razomy/abstractions";

export function separateStrings(
  string: string,
  offset: abstractions.arrays.Offset,
  separateString: string,
  strings: string[],
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
