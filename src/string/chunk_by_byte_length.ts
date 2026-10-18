/**
 * @summary Split string into chunks by maximum byte length.
 * @description Iterates over Unicode characters and groups them into chunks ensuring that each chunk's UTF-8 byte size does not exceed the specified maximum bytes.
 * @param text The input string to chunk.
 * @param maxBytes The maximum allowed byte size per chunk. Defaults to 700.
 * @returns An array of string chunks.
 * @example
 * ```ts
 * chunkByByteLength('Hello', 2); // => ['He', 'll', 'o']
 * ```
 * @example
 * ```ts
 * chunkByByteLength('a👋b', 5); // => ['a👋', 'b']
 * ```
 * @example
 * ```ts
 * chunkByByteLength('こんにちは', 6); // => ['こん', 'にち', 'は']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function chunkByByteLength(text: string, maxBytes: number = 700): string[] {
  const chunks: string[] = [];
  let currentChunk = '';
  let currentBytes = 0;

  for (const char of text) {
    const code = char.codePointAt(0) as number;
    const charByteLength = code <= 0x007f ? 1 : code <= 0x07ff ? 2 : code <= 0xffff ? 3 : 4;

    if (currentBytes + charByteLength > maxBytes) {
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      currentChunk = char;
      currentBytes = charByteLength;
    } else {
      currentChunk += char;
      currentBytes += charByteLength;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}
