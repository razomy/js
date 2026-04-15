import pako from 'pako';
import * as compression from "@razomy/compression";

export function decodeString(encodedStr: string): string {
  const encodedData = compression.arrayBufferFromBase64(encodedStr);
  const decodedData = pako.inflate(encodedData, { to: 'string' });
  return decodedData;
}
