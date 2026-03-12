import * as string from '@razomy/string';

export function replace(text: string.String, separator: string.String, replacement: string.String): string.String {
  return text.split(separator).join(replacement);
}
