/**
 * @summary Splits a string into an array of chunks.
 * @description Divides a string into an array of smaller strings, each of a specified maximum length.
 * @param text The string to chunk.
 * @param size The maximum length of each chunk.
 * @returns The array of string chunks.
 * @throws {RangeError} When size is less than or equal to zero.
 * @example
 * ```ts
 * chunk('12345', 2); // => ['12', '34', '5']
 * ```
 * @example
 * ```ts
 * chunk('hello', 1); // => ['h', 'e', 'l', 'l', 'o']
 * ```
 * @example
 * ```ts
 * chunk('abc', 5); // => ['abc']
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function chunk(text: string, size: number): string[] {
  if (size <= 0) {
    throw new RangeError('Size must be greater than zero');
  }

  const chunksCount = Math.ceil(text.length / size);
  const chunks = new Array<string>(chunksCount);

  for (let index = 0; index < chunksCount; index += 1) {
    const offset = index * size;
    chunks[index] = text.slice(offset, offset + size);
  }

  return chunks;
}