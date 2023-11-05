export function extractSubPathFrom(filePath: string, root: string): string {
  const parts: string[] = filePath.split('/');
  const startIndex: number = parts.indexOf(root);

  if (startIndex !== -1) {
    const result: string = parts.slice(startIndex).join('/');
    return result;
  } else {
    throw new Error('E');// If "e" is not found, return the original path
  }
}

export function extractPrePathFrom(filePath: string, root: string): string {
  const parts: string[] = filePath.split('/');
  const startIndex: number = parts.indexOf(root);

  if (startIndex !== -1) {
    const result: string = parts.slice(0, startIndex).join('/');
    return result;
  } else {
    throw new Error('E');// If "e" is not found, return the original path
  }
}