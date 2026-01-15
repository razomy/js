import {levenshtein_distance} from './levenshtein_distance';

export function similarity(str1: string, str2: string): number {
  const length = Math.max(str1.length, str2.length);
  const distance = levenshtein_distance(str1, str2);
  return 1 - distance / length;
}


