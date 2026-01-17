import {decodeString} from './decode_string';

export function decodeJsonString<T>(encodedStr: string): T {
  const decodedData = decodeString(encodedStr);
  return JSON.parse(decodedData) as T;
}
