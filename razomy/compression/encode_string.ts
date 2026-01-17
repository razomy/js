import pako from 'pako';
import {base64FromArrayBuffer} from './base_64_from_array_buffer';


export function encodeString(input: string): string {
  const encodedData = pako.deflate(input);
  const encodedStr = base64FromArrayBuffer(encodedData);
  return encodedStr;
}

