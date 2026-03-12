import * as string from '@razomy/string';

export function indentLines(value: string, size: number): string {
  const margin = ' '.repeat(size);
  return string.prefixLines(value, margin);
}
