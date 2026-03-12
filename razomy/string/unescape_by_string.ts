import * as string_ from '@razomy/string';

export function unescapeByString(string: string_.String, separateString: string_.String): string_.String {
  return string_.replace(string, '\\' + separateString, separateString);
}
