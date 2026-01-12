import pako from 'pako';


export function encode_string(input: string): string {
  const encoded_data = pako.deflate(input);
  const encoded_str = base64from_array_buffer(encoded_data);
  return encoded_str;
}

export function decode_string(encodedStr: string): string {
  const encoded_data = array_buffer_from_base64(encodedStr);
  const decoded_data = pako.inflate(encoded_data, { to: 'string' });
  return decoded_data;
}


export function encode_json_string<T>(str: T): string {
  const input = JSON.stringify(str);
  return encode_string(input);
}

export function decode_json_string<T>(encodedStr: string): T {
  const decoded_data = decode_string(encodedStr);
  return JSON.parse(decoded_data) as T;
}

function base64from_array_buffer(buffer: ArrayBuffer): string {
  const uint8array = new Uint8Array(buffer);
  let binary = '';
  const length = uint8array.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(uint8array[i]);
  }
  return btoa(binary);
}

function array_buffer_from_base64(base64: string): Uint8Array {
  const binary = atob(base64);
  const length = binary.length;
  const uint8array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8array[i] = binary.charCodeAt(i);
  }
  return uint8array;
}
