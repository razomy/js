export function extractSubPathFrom(filePath, root) {
  const parts = filePath.split('/');
  const startIndex = parts.indexOf(root);

  if (startIndex !== -1) {
    const result = parts.slice(startIndex).join('/');
    return result;
  } else {
    throw 'E';// If "e" is not found, return the original path
  }
}

export function extractPrePathFrom(filePath, root) {
  const parts = filePath.split('/');
  const startIndex = parts.indexOf(root);

  if (startIndex !== -1) {
    const result = parts.slice(0, startIndex).join('/');
    return result;
  } else {
    throw 'E';// If "e" is not found, return the original path
  }
}
