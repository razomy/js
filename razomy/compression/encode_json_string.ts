import {encodeString} from './encode_string';

export function encodeJsonString<T>(str: T): string {
  const input = JSON.stringify(str);
  return encodeString(input);
}
