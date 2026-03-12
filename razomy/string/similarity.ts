import * as string from '@razomy/string';

export function similarity(str1: string, str2: string): number {
  const length: number = Math.max(str1.length, str2.length);

  if (length === 0) return 1;

  const distance: number = string.levenshteinDistance(str1, str2);

  return 1 - distance / length;
}
