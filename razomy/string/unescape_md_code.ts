export function unescapeMdCode(text: string) {
  // Extract content between markdown backticks, ignoring language tags and surrounding whitespace
  const match = text.match(/^\s*```[^\n]*\n([\s\S]*?)\n?```\s*$/);

  // If it matched perfectly, return the captured group (the code). Otherwise, return original.
  return match ? match[1].trim() : text.trim();
}
