import {levenshteinDistance} from './levenshtein_distance';

export function similarity(str1: string, str2: string): number {
  const length = Math.max(str1.length, str2.length);
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / length;
}


