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

export const countSpacesAtFront = (strs: string[]): number[] =>
  strs.map(str => {
    let i = 0;
    for (let chr of str) {
      if (chr == ' ') {
        i++;
      } else {
        return i;
      }
    }
    return i;
  });

export function escapeString(str: string, key: string): string {
  return replaceAll(str, key, '\\' + key);
}

export function unescapeString(str: string, key: string): string {
  return replaceAll(str, '\\' + key, key);
}

export function replaceAll(str: string, searchValue: string, replacement: string): string {
  return str.split(searchValue).join(replacement);
}

export const isString = s => typeof (s) === 'string';

export function add_margin_string(text: string, left_margin: number) {
  const margin = ' '.repeat(left_margin)
  return add_margin(text, margin)
}

export function add_margin(text: string, margin: string) {
  const lines = text.split('\n')
  const shifted_lines = lines.map(line => margin + line);
  return shifted_lines.join('\n')
}