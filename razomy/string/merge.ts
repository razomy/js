import * as string from "@razomy/string";

export function merge(strings: string.String[]): string.String {
  let result: string.String = '';

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
  }

  return result;
}
