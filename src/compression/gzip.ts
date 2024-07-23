import {pako} from 'pako';


export function encodeString(input: string): string {
  const encodedData = pako.deflate(input);
  const encodedStr = base64FromArrayBuffer(encodedData);
  return encodedStr;
}

export function decodeString(encodedStr: string): string {
  const encodedData = arrayBufferFromBase64(encodedStr);
  const decodedData = pako.inflate(encodedData, { to: 'string' });
  return decodedData;
}


export function encodeJsonString<T>(str: T): string {
  const input = JSON.stringify(str);
  return encodeString(input);
}

export function decodeJsonString<T>(encodedStr: string): T {
  const decodedData = decodeString(encodedStr);
  return JSON.parse(decodedData) as T;
}

function base64FromArrayBuffer(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer);
  let binary = '';
  const length = uint8Array.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

function arrayBufferFromBase64(base64: string): Uint8Array {
  const binary = atob(base64);
  const length = binary.length;
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8Array[i] = binary.charCodeAt(i);
  }
  return uint8Array;
}
