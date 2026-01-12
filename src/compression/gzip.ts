import pako from 'pako';


export function encode_string(input: string): string {
  const encodedData = pako.deflate(input);
  const encodedStr = base64from_array_buffer(encodedData);
  return encodedStr;
}

export function decode_string(encodedStr: string): string {
  const encodedData = array_buffer_from_base64(encodedStr);
  const decodedData = pako.inflate(encodedData, { to: 'string' });
  return decodedData;
}


export function encode_json_string<T>(str: T): string {
  const input = JSON.stringify(str);
  return encode_string(input);
}

export function decode_json_string<T>(encodedStr: string): T {
  const decodedData = decode_string(encodedStr);
  return JSON.parse(decodedData) as T;
}

function base64from_array_buffer(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer);
  let binary = '';
  const length = uint8Array.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

function array_buffer_from_base64(base64: string): Uint8Array {
  const binary = atob(base64);
  const length = binary.length;
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8Array[i] = binary.charCodeAt(i);
  }
  return uint8Array;
}
