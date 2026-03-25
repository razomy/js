const MARKDOWN_CODE_BLOCK_PATTERN = /^\s*```[^\n]*\n([\s\S]*?)\n?```\s*$/;

/**
 * @summary Extract content from a Markdown code block.
 * @description Removes surrounding Markdown code block backticks and language tags from a string, returning the inner content. If the string is not a valid Markdown code block, it returns the trimmed original string.
 * @param text The Markdown text.
 * @returns The extracted code or trimmed text.
 * @example
 * ```ts
 * unescapeMdCode('''ts\nconsole.log("hello");\n''''); // => 'console.log("hello");'
 * ```
 * @example
 * ```ts
 * unescapeMdCode(''''\nPlain text block\n''''); // => 'Plain text block'
 * ```
 * @example
 * ```ts
 * unescapeMdCode('Just normal text'); // => 'Just normal text'
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export function unescapeMdCode(text: string): string {
  const match = text.match(MARKDOWN_CODE_BLOCK_PATTERN);

  return match ? match[1].trim() : text.trim();
}
