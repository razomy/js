export function arrayBufferFromBase64(base64: string): Uint8Array {
  const binary = atob(base64);
  const length = binary.length;
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8Array[i] = binary.charCodeAt(i);
  }

  return uint8Array;
}
