import * as compression from "@razomy/compression";

export function decodeJsonString<T>(encodedStr: string): T {
  const decodedData = compression.decodeString(encodedStr);
  return JSON.parse(decodedData) as T;
}
