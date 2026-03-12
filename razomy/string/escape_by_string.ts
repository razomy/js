import * as string_ from '@razomy/string';

export function escapeByString(string: string_.String, separator: string_.String): string_.String {
  return string_.replace(string, separator, '\\' + separator);
}
