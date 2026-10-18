export enum BitSize {
  Bit = 1,
  Byte = 8,
  Short = 16,
  Int = 32,
  Long = 64,
  UUID = 128,    // 128 бит (например, для генерации UUID)
  SHA1 = 160,    // 160 бит
  AES192 = 192,  // 192 бита
  SHA224 = 224,  // 224 бита
  AES256 = 256,  // 256 бит (популярный размер для ключей шифрования)
  SHA384 = 384,  // 384 бита
  SHA512 = 512,  // 512 бит
  RSA1024 = 1024,// 1024 бита
  RSA2048 = 2048 // 2048 бит
}


export function createId(bits: BitSize | number = BitSize.Long): bigint {
  if (bits <= 0) return 0n;

  const bytesNeeded = Math.ceil(bits / 8);
  const buffer = new Uint8Array(bytesNeeded);

  globalThis.crypto.getRandomValues(buffer);

  let result = 0n;

  for (let i = 0; i < bytesNeeded; i++) {
    result |= BigInt(buffer[i]) << BigInt(i * 8);
  }

  const excessBits = (bytesNeeded * 8) - bits;
  if (excessBits > 0) {
    const mask = (1n << BigInt(bits)) - 1n;
    result &= mask;
  }

  return result;
}
