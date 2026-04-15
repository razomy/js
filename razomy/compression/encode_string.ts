import pako from 'pako';
import * as compression from '@razomy/compression';

export function encodeString(input: string): string {
  const encodedData = pako.deflate(input);
  const encodedStr = compression.base64FromArrayBuffer(encodedData);
  return encodedStr;
}
