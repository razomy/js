import * as compression from '@razomy/compression';

export function encodeJsonString<T>(str: T): string {
  const input = JSON.stringify(str);
  return compression.encodeString(input);
}
