/**
 * Convert string to buffer using specified encoding.
 * @param {string} value The string to convert.
 * @param {BufferEncoding} encoding The encoding of the string.
 * @returns {Buffer} The resulting buffer.
 * @example
 * // => <Buffer 61 62 63>
 * toBuffer('abc', 'utf8');
 * @example
 * // => <Buffer 61 62 63>
 * toBuffer('YWJj', 'base64');
 * @example
 * // => <Buffer 61 62 63>
 * toBuffer('616263', 'hex');
 */
export function toBuffer(value: string, encoding: BufferEncoding): Buffer {
  return Buffer.from(value, encoding);
}