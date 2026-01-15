import pako from 'pako';
import {base64from_array_buffer} from './base64from_array_buffer';


export function encode_string(input: string): string {
  const encoded_data = pako.deflate(input);
  const encoded_str = base64from_array_buffer(encoded_data);
  return encoded_str;
}

