/**
 * Extracts a substring found between a start string and an end string.
 * @param text The source text to search within.
 * @param start The string marking the beginning of the extraction.
 * @param end The string marking the end of the extraction.
 * @returns The extracted substring.
 * @throws Error if the start or end delimiters are not found.
 * @example
 * // => 'brown'
 * substringBetween('The quick brown fox', 'quick ', ' fox');
 * @example
 * // => 'value'
 * substringBetween('key="value";', '"', '"');
 * @example
 * // => 'content'
 * substringBetween('<div>content</div>', '<div>', '</div>');
 */
export function substringBetween(text: string, start: string, end: string): string {
  const startIndex = text.indexOf(start);

  if (startIndex === -1) {
    throw new Error(`Start substring '${start}' not found in the source text.`);
  }

  const contentStartIndex = startIndex + start.length;
  const endIndex = text.indexOf(end, contentStartIndex);

  if (endIndex === -1) {
    throw new Error(`End substring '${end}' not found after the start substring.`);
  }

  return text.substring(contentStartIndex, endIndex);
}