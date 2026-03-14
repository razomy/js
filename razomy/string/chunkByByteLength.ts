export function chunkByByteLength(text: string, maxBytes: number = 700): string[] {
  const result: string[] = [];
  let currentChunk = '';
  let currentBytes = 0;

  // for...of iterates cleanly over Unicode characters (preventing emoji slicing)
  for (const char of text) {
    const code = char.codePointAt(0)!;

    // Calculate the UTF-8 byte length of the current character
    let charBytes = 1;
    if (code <= 0x007f) charBytes = 1;
    else if (code <= 0x07ff) charBytes = 2;
    else if (code <= 0xffff) charBytes = 3;
    else charBytes = 4; // Emojis and complex symbols

    // If adding this character exceeds the 700 byte limit, push and reset
    if (currentBytes + charBytes > maxBytes) {
      if (currentChunk) result.push(currentChunk);
      currentChunk = char;
      currentBytes = charBytes;
    } else {
      currentChunk += char;
      currentBytes += charBytes;
    }
  }

  // Push the final remaining chunk
  if (currentChunk) {
    result.push(currentChunk);
  }

  return result;
}