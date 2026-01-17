import pako from 'pako';
import {arrayBufferFromBase64} from './array_buffer_from_base_64';

export function decodeString(encodedStr: string): string {
  const encodedData = arrayBufferFromBase64(encodedStr);
  const decodedData = pako.inflate(encodedData, {to: 'string'});
  return decodedData;
}
