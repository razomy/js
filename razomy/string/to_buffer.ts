/**
 * @summary Convert string to buffer using specified encoding.
 * @param value The string to convert.
 * @param encoding The encoding of the string.
 * @returns The resulting buffer.
 * @example
 * ```ts
 * toBuffer('abc', 'utf8'); // => <Buffer 61 62 63>
 * ```
 * @example
 * ```ts
 * toBuffer('YWJj', 'base64'); // => <Buffer 61 62 63>
 * ```
 * @example
 * ```ts
 * toBuffer('616263', 'hex'); // => <Buffer 61 62 63>
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function toBuffer(value: string, encoding: BufferEncoding): Buffer {
  return Buffer.from(value, encoding);
}
